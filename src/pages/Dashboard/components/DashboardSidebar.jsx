import Sidebar from '../../../sections/Sidebar/Sidebar';
import { DOM_ELEMENT_IDS } from '../../../utils/Constants';

/**
 * DashboardSidebar component - Renders the appropriate sidebar based on report mode
 * @param {Object} props - Component props
 * @param {boolean} props.isPageReportSelected - Whether page report mode is active
 * @param {Array} props.inputControlsData - Input controls data from the visualization
 * @param {Function} props.handleInputControlChange - Handler for input control changes
 * @param {Function} props.onUpdateChart - Handler to update/refresh the chart
 * @param {Function} props.handleDownloadPdf - Handler to download chart as PDF
 */
export const DashboardSidebar = ({
    isPageReportSelected,
    inputControlsData,
    handleInputControlChange,
    onUpdateChart,
    handleDownloadPdf,
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
            <div id={DOM_ELEMENT_IDS.INPUT_CONTROLS_CONTAINER}></div>
            <div className='sidebar-buttons'>
                <button className='btn btn-primary' onClick={onUpdateChart}>
                    Update Chart
                </button>
            </div>
        </section>
    );
};
