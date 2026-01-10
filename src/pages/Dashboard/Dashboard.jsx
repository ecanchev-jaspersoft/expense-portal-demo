import './Dashboard.css';
import './viz.css';
import { useAuth } from '../../context/AuthContext';
import { useDashboardCharts, useInputControls, useVisualization } from '../../hooks';
import { DashboardSidebar, VisualizationContainer, ImageColumn } from './components';
import { PAGE_TYPES } from '../../utils/Constants';
import { useEffect, useRef, useCallback } from 'react';

/**
 * Dashboard component - Main page for displaying JasperReports visualizations
 * 
 * This component orchestrates the display of interactive dashboards and reports.
 * It supports two modes:
 * - Page Report mode: Traditional report with input controls in a sidebar
 * - Interactive Dashboard mode: Dashboard with chart selector and dynamic controls
 * 
 * The component uses custom hooks for separation of concerns:
 * - useDashboardCharts: Manages chart selection and filtering
 * - useInputControls: Handles input control state and updates
 * - useVisualization: Manages JasperReports visualization library integration
 */
const Dashboard = () => {
    const { dispatch, state } = useAuth();
    const isPageReportSelected = state.selectedPage && state.selectedPage === PAGE_TYPES.PAGE_REPORT;
    const { selectedChart, chartOptions, handleChartSwitch } = useDashboardCharts(isPageReportSelected);

    const {
        inputControlsData,
        setInputControlsData,
        handleInputControlChange,
        buildReportParams,
        loadingDependencies,
    } = useInputControls(isPageReportSelected, selectedChart);

    const { isChartLoaded, handleUpdateChart, handleDownloadPdf } = useVisualization(
        selectedChart,
        dispatch,
        setInputControlsData
    );

    // Create immediate update function
    const immediateUpdateChart = useCallback((buildReportParamsFunc) => {
        if (isChartLoaded && selectedChart) {
            handleUpdateChart(buildReportParamsFunc);
        }
    }, [handleUpdateChart, isChartLoaded, selectedChart]);

    // Track previous input control values to detect actual changes
    const previousInputValues = useRef({});

    // Trigger automatic chart updates when input controls change
    useEffect(() => {
        // Trigger for any input control changes when chart is loaded (both dashboard and page report modes)
        if (inputControlsData.length > 0 && isChartLoaded && selectedChart) {
            // Check if any input control values actually changed
            const currentValues = inputControlsData.reduce((acc, ic) => {
                if (ic.type === 'multiSelect') {
                    acc[ic.id] = ic.state?.options?.filter(opt => opt.selected).map(opt => opt.value) || [];
                } else {
                    acc[ic.id] = ic.state?.value || '';
                }
                return acc;
            }, {});
            
            const valuesChanged = JSON.stringify(currentValues) !== JSON.stringify(previousInputValues.current);
            
            if (valuesChanged) {
                previousInputValues.current = currentValues;
                immediateUpdateChart(buildReportParams);
            }
        }
    }, [inputControlsData, buildReportParams, immediateUpdateChart, isChartLoaded, selectedChart]);

    return (
        <main className='dashboard-page h-main-section'>
            <DashboardSidebar
                isPageReportSelected={isPageReportSelected}
                inputControlsData={inputControlsData}
                handleInputControlChange={handleInputControlChange}
                handleDownloadPdf={handleDownloadPdf}
                loadingDependencies={loadingDependencies}
            />
            <VisualizationContainer 
                chartOptions={chartOptions}
                selectedChartName={selectedChart?.name}
                handleChartSwitch={handleChartSwitch}
            />
            <ImageColumn isVisible={isChartLoaded && isPageReportSelected} />
        </main>
    );
};

export default Dashboard;
