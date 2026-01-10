import Sidebar from '../../../sections/Sidebar/Sidebar';
import { DashboardInputControls } from './DashboardInputControls';

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
}) => {
    if (isPageReportSelected) {
        return (
            <Sidebar
                inputControlsData={inputControlsData}
                handleSwitchButtonChange={handleInputControlChange}
                handleDownloadPdf={handleDownloadPdf}
            />
        );
    }

    return (
        <section className='sidebar'>
            <DashboardInputControls
                inputControlsData={inputControlsData}
                handleInputChange={handleInputControlChange}
                loadingDependencies={loadingDependencies}
            />
        </section>
    );
};
