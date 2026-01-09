import { useState } from 'react';
import { BOOLEAN_TEXT } from '../utils/Constants';
import { doPostToFetchDependentOptions } from '../services/inputControlsService';

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
            await fetchDependentOptions(icName, currentControl.slaveDependencies, icsUpdated);
        }
    };

    const fetchDependentOptions = async (controlId, slaveDependencies, latestInputControlsData) => {
        // Set loading state for all dependent controls
        const loadingStates = {};
        slaveDependencies.forEach(depId => {
            loadingStates[depId] = true;
        });
        setLoadingDependencies(prev => ({ ...prev, ...loadingStates }));

        try {
            // Get the master control data from the latest data
            const masterControl = latestInputControlsData.find(ic => ic.id === controlId);
            const masterSelectedValues = masterControl?.state?.options
                ?.filter(opt => opt.selected)
                ?.map(opt => opt.value) || [];

            // Build request body with slave dependencies first, then master control
            const requestBody = {};

            // Add slave dependencies with their current values from latest data
            slaveDependencies.forEach(slaveId => {
                const slaveControl = latestInputControlsData.find(ic => ic.id === slaveId);
                const currentValues = slaveControl?.state?.options
                    ?.filter(opt => opt.selected)
                    ?.map(opt => opt.value) || [];
                requestBody[slaveId] = currentValues;
            });

            // Add master control as the last element
            requestBody[controlId] = masterSelectedValues;

            // Build API URI
            const slaveDependenciesIds = masterControl.slaveDependencies.join(';');
            const resourcePath = '/public/Demo_Example/Embedded_Dashboards/Financial_Health___Performance';
            const apiUri = 'http://localhost:8080/jasperserver-pro/rest_v2/reports'+resourcePath+'/inputControls/'+slaveDependenciesIds+'/values?freshData=false&includeTotalCount=true';

            // Call the service
            const response = await doPostToFetchDependentOptions(apiUri, requestBody);
            console.log('API Response - Dependent options fetched:', response);

            // Update dependent controls with API response
            if (response?.inputControlState) {
                const updatedControls = latestInputControlsData.map(ic => {
                    // Find matching control in API response
                    const apiControl = response.inputControlState.find(apiIc => apiIc.id === ic.id);
                    
                    if (apiControl) {
                        // Update control with new options from API
                        return {
                            ...ic,
                            state: {
                                ...ic.state,
                                options: apiControl.options
                            }
                        };
                    }
                    
                    return ic; // Return unchanged if no match
                });

                setInputControlsData(updatedControls);
            } else {
                console.warn('API response does not contain inputControlState:', response);
            }
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
