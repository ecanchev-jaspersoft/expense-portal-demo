import { useMemo } from 'react';
import { CHARTS, CHART_NAMES } from '../utils/Constants';

/**
 * Custom hook to manage dashboard chart options
 * Simplified to only provide chart options, state managed in Auth context
 * @param {boolean} isPageReportSelected - Whether page report mode is active
 * @returns {Object} Chart options data
 */
export const useDashboardCharts = (isPageReportSelected) => {
    // Filter charts to only include dashboard-type visualizations
    const dashboardLikeReports = useMemo(() => {
        return CHARTS.filter((chart) => 
            CHART_NAMES.CUSTOMER_MARKET === chart.name || 
            CHART_NAMES.FINANCIAL_HEALTH === chart.name || 
            CHART_NAMES.OPERATIONAL_EFFICIENCY === chart.name || 
            CHART_NAMES.PEOPLE_TALENT === chart.name
        );
    }, []);

    const chartOptions = useMemo(() => {
        if (isPageReportSelected) {
            return CHARTS.map((chart) => ({
                value: chart.name,
                label: chart.name,
            }));
        }
        return dashboardLikeReports.map((chart) => ({
            value: chart.name,
            label: chart.name,
        }));
    }, [dashboardLikeReports, isPageReportSelected]);

    return {
        dashboardLikeReports,
        chartOptions,
    };
};
