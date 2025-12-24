import { useState } from 'react';
import { BOOLEAN_TEXT } from '../utils/Constants';

/**
 * Custom hook to manage input controls state and updates
 * @param {boolean} isPageReportSelected - Whether page report mode is active
 * @returns {Object} Input controls state and handlers
 */
export const useInputControls = (isPageReportSelected) => {
    const [inputControlsData, setInputControlsData] = useState([]);
    const [inputControlsDataForInteractiveDashboard, setInputControlsDataForInteractiveDashboard] = useState([]);

    const handleInputControlChange = (newValue, icName) => {
        let strValue = newValue;
        // Page reports require boolean values as string literals
        if (isPageReportSelected) {
            strValue = newValue ? BOOLEAN_TEXT.TRUE : BOOLEAN_TEXT.FALSE;
        }
        // Update the specific input control while preserving others
        const icsUpdated = inputControlsData.map((ic) => {
            if (ic.id !== icName) {
                return ic;
            }
            return {
                ...ic,
                state: {
                    ...ic.state,
                    value: strValue,
                },
            };
        });
        setInputControlsData(icsUpdated);
    };

    /**
     * Builds report parameters object from input controls data
     * JasperReports expects parameters as { paramName: [value] }
     */
    const buildReportParams = () => {
        return inputControlsData.reduce((accum, icData) => {
            accum[icData.id] = [icData.state.value];
            return accum;
        }, {});
    };

    return {
        inputControlsData,
        setInputControlsData,
        inputControlsDataForInteractiveDashboard,
        setInputControlsDataForInteractiveDashboard,
        handleInputControlChange,
        buildReportParams,
    };
};
