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
 * @param {Function} props.handleDashboardInputChange - Handler for dashboard input control changes
 */
export const DashboardSidebar = ({
    isPageReportSelected,
    inputControlsData,
    handleInputControlChange,
    onUpdateChart,
    handleDownloadPdf,
    handleDashboardInputChange,
}) => {
    if (isPageReportSelected) {
        return (
            <Sidebar
                inputControlsData={inputControlsData}
                handleSwitchButtonChange={handleInputControlChange}
                handleUpdateChart={onUpdateChart}
                handleDownloadPdf={handleDownloadPdf}
            />
        );
    }

    return (
        <section className='sidebar'>
            <DashboardInputControls
                inputControlsData={inputControlsData}
                handleInputChange={handleDashboardInputChange}
            />
            <div className='sidebar-buttons'>
                <button className='btn btn-primary' onClick={onUpdateChart}>
                    Update Chart
                </button>
            </div>
        </section>
    );
};
