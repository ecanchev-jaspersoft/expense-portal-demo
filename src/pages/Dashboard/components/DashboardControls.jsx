import SingleValueInputControls from './SingleValueInputControls/SingleValueInputControls';
import { MultiValuesInputControls } from './MultiValuesInputControls/MultiValuesInputControls';

/**
 * DashboardControls component - Renders the appropriate input controls based on report mode
 * Now displays horizontally at the top instead of in a sidebar
 * @param {Object} props - Component props
 * @param {boolean} props.isPageReportSelected - Whether page report mode is active
 * @param {Array} props.inputControlsData - Input controls data from the visualization
 * @param {Function} props.handleInputControlChange - Handler for input control changes
 * @param {Function} props.onUpdateChart - Handler to update/refresh the chart
 * @param {Function} props.handleDownloadPdf - Handler to download chart as PDF
 * @param {Object} props.loadingDependencies - Loading states for dependent controls
 */
export const DashboardControls = ({
    isPageReportSelected,
    inputControlsData,
    handleInputControlChange,
    handleDownloadPdf,
    loadingDependencies,
    isChartLoaded,
}) => {
    if (isPageReportSelected) {
        return (
            <SingleValueInputControls
                inputControlsData={inputControlsData}
                handleSwitchButtonChange={handleInputControlChange}
                handleDownloadPdf={handleDownloadPdf}
                isChartLoaded={isChartLoaded}
            />
        );
    }

    return (
        <section className='dashboard-controls-horizontal'>
            <MultiValuesInputControls
                inputControlsData={inputControlsData}
                handleInputChange={handleInputControlChange}
                loadingDependencies={loadingDependencies}
                isChartLoaded={isChartLoaded}
            />
        </section>
    );
};
