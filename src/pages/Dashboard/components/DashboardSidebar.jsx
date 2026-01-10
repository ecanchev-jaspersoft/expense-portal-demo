import SingleValueInputControls from './SingleValueInputControls/SingleValueInputControls';
import { MultiValuesInputControls } from './MultiValuesInputControls/MultiValuesInputControls';

/**
 * DashboardSidebar component - Renders the appropriate sidebar based on report mode
 * @param {Object} props - Component props
 * @param {boolean} props.isPageReportSelected - Whether page report mode is active
 * @param {Array} props.inputControlsData - Input controls data from the visualization
 * @param {Function} props.handleInputControlChange - Handler for input control changes
 * @param {Function} props.onUpdateChart - Handler to update/refresh the chart
 * @param {Function} props.handleDownloadPdf - Handler to download chart as PDF
 * @param {Object} props.loadingDependencies - Loading states for dependent controls
 */
export const DashboardSidebar = ({
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
        <section className='sidebar'>
            <MultiValuesInputControls
                inputControlsData={inputControlsData}
                handleInputChange={handleInputControlChange}
                loadingDependencies={loadingDependencies}
                isChartLoaded={isChartLoaded}
            />
        </section>
    );
};
