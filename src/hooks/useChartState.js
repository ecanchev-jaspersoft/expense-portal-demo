import { useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { AUTH_ACTIONS } from '../utils/Constants';
import { useDashboardCharts } from './useDashboardCharts';

/**
 * Custom hook to manage chart state with context synchronization
 * Eliminates duplication between Dashboard and Header components
 * @param {boolean} isPageReportSelected - Whether page report mode is active
 * @returns {Object} Chart state and handlers
 */
export const useChartState = (isPageReportSelected) => {
    const { dispatch, state } = useAuth();
    const { selectedChart, chartOptions, handleChartSwitch } = useDashboardCharts(isPageReportSelected);

    // Sync chart options to context when they change
    useEffect(() => {
        if (chartOptions) {
            dispatch({ type: AUTH_ACTIONS.SET_CHART_OPTIONS, payload: chartOptions });
        }
    }, [chartOptions, dispatch]);

    // Sync selected chart to context when it changes
    useEffect(() => {
        if (selectedChart?.name) {
            dispatch({ type: AUTH_ACTIONS.SET_SELECTED_CHART, payload: selectedChart.name });
        }
    }, [selectedChart, dispatch]);

    // Sync local chart selection with context changes (when tabs are clicked in header)
    useEffect(() => {
        if (state.selectedChartName && selectedChart?.name !== state.selectedChartName) {
            handleChartSwitch(state.selectedChartName);
        }
    }, [state.selectedChartName, selectedChart, handleChartSwitch]);

    // Unified chart switch handler that updates both local state and context
    const unifiedHandleChartSwitch = useCallback((chartName) => {
        handleChartSwitch(chartName);
        dispatch({ type: AUTH_ACTIONS.SET_SELECTED_CHART, payload: chartName });
    }, [handleChartSwitch, dispatch]);

    return {
        selectedChart,
        chartOptions,
        handleChartSwitch: unifiedHandleChartSwitch,
    };
};
