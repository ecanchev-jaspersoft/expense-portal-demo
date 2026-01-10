import './Dashboard.css';
import './viz.css';
import { useAuth } from '../../context/AuthContext';
import { useDashboardCharts, useInputControls, useVisualization } from '../../hooks';
import { DashboardSidebar, VisualizationContainer, ImageColumn } from './components';
import { PAGE_TYPES } from '../../utils/Constants';

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

    const onUpdateChart = () => {
        handleUpdateChart(buildReportParams);
    };

    return (
        <main className='dashboard-page h-main-section'>
            <DashboardSidebar
                isPageReportSelected={isPageReportSelected}
                inputControlsData={inputControlsData}
                handleInputControlChange={handleInputControlChange}
                onUpdateChart={onUpdateChart}
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
