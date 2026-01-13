import { MultiValuesInputControls } from '../MultiValuesInputControls/MultiValuesInputControls';
import { useAuth } from '../../../../context/AppContext';
import './DashboardControls.css';

/**
 * DashboardControls component - Renders horizontal input controls for dashboard mode
 * Only used for dashboard mode, page report mode uses SidebarControls directly
 * @param {Object} props - Component props
 * @param {Array} props.inputControlsData - Input controls data from the visualization
 * @param {Function} props.handleInputControlChange - Handler for input control changes
 * @param {Function} props.clearMultiSelects - Handler to clear all multi-select dropdowns
 * @param {Object} props.loadingDependencies - Loading states for dependent controls
 * @param {boolean} props.isChartLoaded - Whether chart is loaded
 */
export const DashboardControls = ({
    inputControlsData,
    handleInputControlChange,
    clearMultiSelects,
    loadingDependencies,
    isChartLoaded,
}) => {
    const { state } = useAuth();
    
    return (
        <section className='dashboard-controls-horizontal'>
            <div className='dashboard-controls-header'>
                <div className='dashboard-controls-title-section'>
                    <h2 className='chart-title'>{state.selectedChart?.name || 'Dashboard'}</h2>
                    <button 
                        className='clear-btn'
                        onClick={clearMultiSelects}
                        disabled={!isChartLoaded || !inputControlsData.some(ic => ic.type === 'multiSelect')}
                    >
                        Clear All
                    </button>
                </div>
            </div>
            <MultiValuesInputControls
                inputControlsData={inputControlsData}
                handleInputChange={handleInputControlChange}
                loadingDependencies={loadingDependencies}
                isChartLoaded={isChartLoaded}
            />
        </section>
    );
};
