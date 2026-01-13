import { useEffect, useCallback } from 'react';
import { useAuth } from '../context/AppContext';
import { AUTH_ACTIONS, CHARTS } from '../utils/Constants';
import { useDashboardCharts } from './useDashboardCharts';

/**
 * Custom hook to manage chart state with context as single source of truth
 * Eliminates duplication by using Auth context instead of local state
 * @param {boolean} isPageReportSelected - Whether page report mode is active
 * @returns {Object} Chart state and handlers
 */
export const useChartState = (isPageReportSelected) => {
    const { dispatch, state } = useAuth();
    const { chartOptions } = useDashboardCharts(isPageReportSelected);

    // Initialize selected chart from context or set default
    useEffect(() => {
        if (!state.selectedChart) {
            const defaultChart = isPageReportSelected 
                ? CHARTS[0]
                : chartOptions?.[0] ? CHARTS.find(chart => chart.name === chartOptions[0].value) : null;
            
            if (defaultChart) {
                dispatch({ type: AUTH_ACTIONS.SET_SELECTED_CHART_OBJECT, payload: defaultChart });
            }
        }
    }, [isPageReportSelected, chartOptions, state.selectedChart, dispatch]);

    // Handle chart switching by updating context
    const handleChartSwitch = useCallback((chartName) => {
        const newChart = CHARTS.find(chart => chart.name === chartName);
        if (newChart) {
            dispatch({ type: AUTH_ACTIONS.SET_SELECTED_CHART_OBJECT, payload: newChart });
        }
    }, [dispatch]);

    return {
        selectedChart: state.selectedChart,
        chartOptions,
        handleChartSwitch,
    };
};
