import { useState } from 'react';
import { BOOLEAN_TEXT } from '../utils/Constants';

/**
 * Custom hook to manage input controls state and updates
 * @param {boolean} isPageReportSelected - Whether page report mode is active
 * @returns {Object} Input controls state and handlers
 */
export const useInputControls = (isPageReportSelected) => {
    const [inputControlsData, setInputControlsData] = useState([]);
    const [loadingDependencies, setLoadingDependencies] = useState({});

    const handleInputControlChange = async (newValue, icName) => {
        // Find the current control to check for dependencies
        const currentControl = inputControlsData.find(ic => ic.id === icName);
        
        // Update the specific input control while preserving others
        const icsUpdated = inputControlsData.map((ic) => {
            if (ic.id !== icName) {
                return ic;
            }
            
            // Handle different data structures
            if (Array.isArray(newValue)) {
                // Multi-select dropdown - update the entire options array
                return {
                    ...ic,
                    state: {
                        ...ic.state,
                        options: newValue,
                    },
                };
            } else {
                // Regular input control - handle boolean/string conversion
                let strValue = newValue;
                if (isPageReportSelected) {
                    strValue = newValue ? BOOLEAN_TEXT.TRUE : BOOLEAN_TEXT.FALSE;
                }
                return {
                    ...ic,
                    state: {
                        ...ic.state,
                        value: strValue,
                    },
                };
            }
        });

        // Update state first
        setInputControlsData(icsUpdated);

        // Handle dependencies if this is a multi-select with slaves
        if (currentControl?.type === 'multiSelect' && currentControl?.slaveDependencies?.length > 0) {
            await fetchDependentOptions(icName, currentControl.slaveDependencies);
        }
    };

    const fetchDependentOptions = async (controlId, slaveDependencies) => {
        // Set loading state for all dependent controls
        const loadingStates = {};
        slaveDependencies.forEach(depId => {
            loadingStates[depId] = true;
        });
        setLoadingDependencies(prev => ({ ...prev, ...loadingStates }));

        try {
            // TODO: Replace with actual API call
            console.log(`Fetching dependencies for ${controlId}:`, slaveDependencies);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // TODO: Replace with actual API response
            // For now, we'll just reset the dependent controls
            const updatedControls = inputControlsData.map(ic => {
                if (slaveDependencies.includes(ic.id)) {
                    return {
                        ...ic,
                        state: {
                            ...ic.state,
                            options: ic.state.options.map(opt => ({ ...opt, selected: false }))
                        }
                    };
                }
                return ic;
            });

            setInputControlsData(updatedControls);
        } catch (error) {
            console.error('Error fetching dependent options:', error);
        } finally {
            // Clear loading states
            const clearedStates = {};
            slaveDependencies.forEach(depId => {
                clearedStates[depId] = false;
            });
            setLoadingDependencies(prev => ({ ...prev, ...clearedStates }));
        }
    };

    /**
     * Builds report parameters object from input controls data
     * JasperReports expects parameters as { paramName: [value] }
     */
    const buildReportParams = () => {
        return inputControlsData.reduce((accum, icData) => {
            if (icData.state?.options) {
                // Handle multi-select dropdowns
                if (icData.type === 'multiSelect') {
                    // Extract selected values from multi-select structure
                    const selectedValues = icData.state.options
                        .filter(option => option.selected)
                        .map(option => option.value.trim());
                    accum[icData.id] = selectedValues;
                } else {
                    // Handle regular dropdowns
                    accum[icData.id] = [icData.state.value.trim()];
                }
            } else {
                // Handle other input control types
                accum[icData.id] = [icData.state.value.trim()];
            }
            return accum;
        }, {});
    };

    return {
        inputControlsData,
        setInputControlsData,
        handleInputControlChange,
        buildReportParams,
        loadingDependencies,
    };
};
