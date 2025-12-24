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
        if (isPageReportSelected) {
            strValue = newValue ? BOOLEAN_TEXT.TRUE : BOOLEAN_TEXT.FALSE;
        }
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
