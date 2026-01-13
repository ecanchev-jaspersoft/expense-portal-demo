import { useCallback } from 'react';
import { useAuth } from '../context/AppContext';
import { BOOLEAN_TEXT, DOM_ELEMENT_IDS, AUTH_ACTIONS, CHARTS } from '../utils/Constants';
import { doPostToFetchDependentOptions } from '../services/inputControlsService';

/**
 * Custom hook to manage input controls state and updates
 * Uses Auth context as single source of truth for state management
 * @param {boolean} isPageReportSelected - Whether page report mode is active
 * @param {Object} selectedChart - Currently selected chart with resource path
 * @returns {Object} Input controls state and handlers
 */
export const useInputControls = (isPageReportSelected, selectedChart) => {
    const { dispatch, state } = useAuth();
    const { inputControlsData, loadingDependencies } = state;

    // Determine which chart to use based on mode
    const chartToUse = isPageReportSelected ? CHARTS[0] : selectedChart;

    // Helper function to extract selected values from a control
    const getSelectedValues = (control) => {
        return control?.state?.options
            ?.filter(opt => opt.selected)
            ?.map(opt => opt.value) || [];
    };

    // Helper function to find control by ID
    const findControlById = (controls, controlId) => {
        return controls.find(ic => ic.id === controlId);
    };

    // Helper function to manage loading states
    const manageLoadingStates = useCallback((dependencies, isLoading) => {
        const states = {};
        dependencies.forEach(depId => {
            states[depId] = isLoading;
        });
        dispatch({ type: AUTH_ACTIONS.SET_LOADING_DEPENDENCIES, payload: { ...loadingDependencies, ...states } });
    }, [dispatch, loadingDependencies]);

    const handleInputControlChange = async (newValue, icName) => {
        // Find the current control to check for dependencies
        const currentControl = findControlById(inputControlsData, icName);
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
        dispatch({ type: AUTH_ACTIONS.SET_INPUT_CONTROLS_DATA, payload: icsUpdated });

        // Handle dependencies if this is a multi-select with slaves
        if (currentControl?.type === 'multiSelect' && currentControl?.slaveDependencies?.length > 0) {
            await fetchDependentOptions(icName, currentControl.slaveDependencies, icsUpdated);
        }
    };

    const fetchDependentOptions = async (controlId, slaveDependencies, latestInputControlsData) => {
        if (!chartToUse?.resource) {
            console.warn('No chart available for API call');
            return;
        }
        // Set loading state for all dependent controls
        manageLoadingStates(slaveDependencies, true);

        try {
            // Get the master control data from the latest data
            const masterControl = findControlById(latestInputControlsData, controlId);
            const masterSelectedValues = getSelectedValues(masterControl);

            // Build request body with slave dependencies first, then master control
            const requestBody = {};

            // Add slave dependencies with their current values from latest data
            slaveDependencies.forEach(slaveId => {
                const slaveControl = findControlById(latestInputControlsData, slaveId);
                const currentValues = getSelectedValues(slaveControl);
                requestBody[slaveId] = currentValues;
            });

            // Add master control as the last element
            requestBody[controlId] = masterSelectedValues;

            // Build API URI - only if chartToUse is available
            const apiUri = `http://localhost:8080/jasperserver-pro/rest_v2/reports${chartToUse.resource}/inputControls/${masterControl.slaveDependencies.join(';')}/values?freshData=false&includeTotalCount=true`;

            // Call the service
            const response = await doPostToFetchDependentOptions(apiUri, requestBody);

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

                dispatch({ type: AUTH_ACTIONS.SET_INPUT_CONTROLS_DATA, payload: updatedControls });
            } else {
                console.warn('API response does not contain inputControlState:', response);
            }
        } catch (error) {
            console.error('Error fetching dependent options:', error);
        } finally {
            // Clear loading states
            manageLoadingStates(slaveDependencies, false);
        }
    };

    /**
     * Builds report parameters object from input controls data
     * JasperReports expects parameters as { paramName: [value] }
     */
    const clearMultiSelects = async () => {
        // Clear all multi-select dropdowns by setting all options to selected: false
        const clearedControls = inputControlsData.map((ic) => {
            if (ic.type === 'multiSelect' && ic.state?.options) {
                return {
                    ...ic,
                    state: {
                        ...ic.state,
                        options: ic.state.options.map(option => ({
                            ...option,
                            selected: false
                        }))
                    }
                };
            }
            return ic;
        });

        // Update state
        dispatch({ type: AUTH_ACTIONS.SET_INPUT_CONTROLS_DATA, payload: clearedControls });

        // Clear date picker input
        const dateInputElement = document.getElementById(DOM_ELEMENT_IDS.DATE_PICKER_ID);
        if (dateInputElement) {
            dateInputElement.value = '';
        }

        // Handle dependencies for all multi-select controls
        const multiSelectControls = clearedControls.filter(ic => ic.type === 'multiSelect');
        for (const control of multiSelectControls) {
            if (control.slaveDependencies?.length > 0) {
                await fetchDependentOptions(control.id, control.slaveDependencies, clearedControls);
            }
        }
    };

    const buildReportParams = () => {
        return inputControlsData.reduce((accum, icData) => {
            if (icData.state?.options) {
                // Handle multi-select dropdowns
                if (icData.type === 'multiSelect') {
                    // Extract selected values from multi-select structure
                    const selectedValues = getSelectedValues(icData);
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
        handleInputControlChange,
        clearMultiSelects,
        buildReportParams,
        loadingDependencies,
    };
};
