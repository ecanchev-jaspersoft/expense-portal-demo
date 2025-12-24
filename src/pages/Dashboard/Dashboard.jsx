import './Dashboard.css';
import './viz.css';
import { useAuth } from '../../context/AuthContext';
import { useDashboardCharts } from '../../hooks/useDashboardCharts';
import { useInputControls } from '../../hooks/useInputControls';
import { useVisualization } from '../../hooks/useVisualization';
import { DashboardSidebar } from './components/DashboardSidebar';
import { ChartSelector } from './components/ChartSelector';
import { VisualizationContainer } from './components/VisualizationContainer';
import { ImageColumn } from './components/ImageColumn';
import { PAGE_TYPES } from '../../utils/Constants';

const Dashboard = () => {
    const { dispatch, state } = useAuth();

    const isPageReportSelected = state.selectedPage && state.selectedPage === PAGE_TYPES.PAGE_REPORT;

    const { selectedChart, chartOptions, handleChartSwitch } = useDashboardCharts(isPageReportSelected);

    const {
        inputControlsData,
        setInputControlsData,
        inputControlsDataForInteractiveDashboard,
        setInputControlsDataForInteractiveDashboard,
        handleInputControlChange,
        buildReportParams,
    } = useInputControls(isPageReportSelected);

    const { isChartLoaded, handleUpdateChart, handleDownloadPdf } = useVisualization(
        selectedChart,
        dispatch,
        isPageReportSelected,
        setInputControlsData,
        setInputControlsDataForInteractiveDashboard
    );

    const onUpdateChart = () => {
        handleUpdateChart(inputControlsDataForInteractiveDashboard, buildReportParams);
    };

    return (
        <main className='dashboard-page h-main-section'>
            <DashboardSidebar
                isPageReportSelected={isPageReportSelected}
                inputControlsData={inputControlsData}
                handleInputControlChange={handleInputControlChange}
                onUpdateChart={onUpdateChart}
                handleDownloadPdf={handleDownloadPdf}
            />
            {!isPageReportSelected && (
                <ChartSelector chartOptions={chartOptions} selectedChartName={selectedChart?.name} handleChartSwitch={handleChartSwitch} />
            )}
            <VisualizationContainer />
            <ImageColumn isVisible={isChartLoaded && isPageReportSelected} />
        </main>
    );
};

export default Dashboard;
