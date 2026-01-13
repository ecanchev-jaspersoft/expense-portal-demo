import { MultiValuesInputControls } from './MultiValuesInputControls/MultiValuesInputControls';

/**
 * DashboardControls component - Renders horizontal input controls for dashboard mode
 * Only used for dashboard mode, page report mode uses SidebarControls directly
 * @param {Object} props - Component props
 * @param {Array} props.inputControlsData - Input controls data from the visualization
 * @param {Function} props.handleInputControlChange - Handler for input control changes
 * @param {Object} props.loadingDependencies - Loading states for dependent controls
 * @param {boolean} props.isChartLoaded - Whether chart is loaded
 */
export const DashboardControls = ({
    inputControlsData,
    handleInputControlChange,
    loadingDependencies,
    isChartLoaded,
}) => {
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
