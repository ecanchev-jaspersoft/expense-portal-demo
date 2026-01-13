import './SidebarControls.css';
import SingleValueInputControls from '../SingleValueInputControls/SingleValueInputControls';

/**
 * SidebarControls component - Container for SingleValueInputControls in sidebar layout
 * Used for page report mode to show switch buttons and dropdown in vertical sidebar
 */
export const SidebarControls = ({
    inputControlsData,
    handleSwitchButtonChange,
    handleDownloadPdf,
    isChartLoaded,
}) => {
    return (
        <aside className='sidebar-controls'>
            <SingleValueInputControls
                inputControlsData={inputControlsData}
                handleSwitchButtonChange={handleSwitchButtonChange}
                handleDownloadPdf={handleDownloadPdf}
                isChartLoaded={isChartLoaded}
            />
        </aside>
    );
};
