import { useState, useEffect, useMemo } from 'react';
import { CHARTS, CHART_NAMES } from '../utils/Constants';

/**
 * Custom hook to manage dashboard chart selection and filtering
 * @param {boolean} isPageReportSelected - Whether page report mode is active
 * @returns {Object} Chart management state and handlers
 */
export const useDashboardCharts = (isPageReportSelected) => {
    const [selectedChart, setSelectedChart] = useState(null);

    // Filter charts to only include dashboard-type visualizations
    const dashboardLikeReports = useMemo(() => {
        return CHARTS.filter((chart) => chart.name === CHART_NAMES.FINANCIAL_HEALTH || chart.name === CHART_NAMES.CUSTOMER_MARKET);
    }, []);

    const chartOptions = useMemo(() => {
        return dashboardLikeReports.map((chart) => ({
            value: chart.name,
            label: chart.name,
        }));
    }, [dashboardLikeReports]);

    useEffect(() => {
        const selectedDashboard = isPageReportSelected ? CHARTS[0] : dashboardLikeReports[0];
        setSelectedChart(selectedDashboard);
    }, [isPageReportSelected, dashboardLikeReports]);

    const handleChartSwitch = (chartName) => {
        const newChart = dashboardLikeReports.find((chart) => chart.name === chartName);
        if (newChart) {
            setSelectedChart(newChart);
        }
    };

    return {
        selectedChart,
        setSelectedChart,
        dashboardLikeReports,
        chartOptions,
        handleChartSwitch,
    };
};
