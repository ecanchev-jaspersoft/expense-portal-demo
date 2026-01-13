import './Dashboard.css';
import './viz.css';
import { useAuth } from '../../context/AppContext';
import { useChartState, useInputControls, useVisualization } from '../../hooks';
import { DashboardControls, VisualizationContainer, ImageColumn, SidebarControls } from './components';
import { PAGE_TYPES } from '../../utils/Constants';
import { useEffect, useRef, useCallback } from 'react';

/**
 * Dashboard component - Main page for displaying JasperReports visualizations
 * 
 * This component orchestrates the display of interactive dashboards and reports.
 * It supports two modes:
 * - Page Report mode: Traditional report with input controls at the top
 * - Interactive Dashboard mode: Dashboard with chart selector and dynamic controls
 * 
 * The component uses custom hooks for separation of concerns:
 * - useChartState: Manages chart selection and context synchronization
 * - useInputControls: Handles input control state and updates
 * - useVisualization: Manages JasperReports visualization library integration
 */
const Dashboard = () => {
    const { state } = useAuth();
    const isPageReportSelected = state.selectedPage && state.selectedPage === PAGE_TYPES.PAGE_REPORT;
    
    // Initialize chart state if needed
    useChartState(isPageReportSelected);

    const {
        inputControlsData,
        handleInputControlChange,
        clearMultiSelects,
        buildReportParams,
        loadingDependencies,
    } = useInputControls(isPageReportSelected, state.selectedChart);

    const { isChartLoaded, handleUpdateChart, handleDownloadPdf } = useVisualization(
        state.selectedChart
    );

    // Create immediate update function
    const immediateUpdateChart = useCallback((buildReportParamsFunc) => {
        if (isChartLoaded && state.selectedChart) {
            handleUpdateChart(buildReportParamsFunc);
        }
    }, [handleUpdateChart, isChartLoaded, state.selectedChart]);

    // Track previous input control values to detect actual changes
    const previousInputValues = useRef({});

    // Trigger automatic chart updates when input controls change
    useEffect(() => {
        // Trigger for any input control changes when chart is loaded (both dashboard and page report modes)
        if (inputControlsData.length > 0 && isChartLoaded && state.selectedChart) {
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
    }, [inputControlsData, buildReportParams, immediateUpdateChart, isChartLoaded, state.selectedChart]);

    return (
        <div className='dashboard-page'>
            {isPageReportSelected ? (
                <main className='dashboard-main-content'
                style={{maxHeight: '100vh'}}>
                    <SidebarControls
                        inputControlsData={inputControlsData}
                        handleSwitchButtonChange={handleInputControlChange}
                        handleDownloadPdf={handleDownloadPdf}
                        isChartLoaded={isChartLoaded}
                    />
                    <VisualizationContainer />
                    <ImageColumn isVisible={isChartLoaded && isPageReportSelected}/>
                </main>
            ) : (
                <>
                    <DashboardControls
                        inputControlsData={inputControlsData}
                        handleInputControlChange={handleInputControlChange}
                        clearMultiSelects={clearMultiSelects}
                        loadingDependencies={loadingDependencies}
                        isChartLoaded={isChartLoaded}
                    />
                    <main className='dashboard-main-content'>
                        <VisualizationContainer />
                    </main>
                </>
            )}
        </div>
    );
};

export default Dashboard;
