import Sidebar from '../../../sections/Sidebar/Sidebar';
import { DOM_ELEMENT_IDS } from '../../../utils/Constants';

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
