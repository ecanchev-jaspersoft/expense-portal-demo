import './DashboardInputControls.css';
import { Dropdown } from '../../../utils/InputControls/Dropdown/Dropdown';
import { MultiSelectDropdown } from '../../../utils/InputControls/MultiSelectDropdown/MultiSelectDropdown';

/**
 * DashboardInputControls component - Custom input controls for dashboard mode
 * @param {Object} props - Component props
 * @param {Array} props.inputControlsData - Input controls data from the visualization
 * @param {Function} props.handleInputChange - Handler for input control changes
 * @param {Object} props.loadingDependencies - Loading states for dependent controls
 */
export const DashboardInputControls = ({ inputControlsData, handleInputChange, loadingDependencies, isChartLoaded }) => {
    if (!inputControlsData || inputControlsData.length === 0) {
        return null;
    }

    return (
        <div className='dashboard-input-controls'>
            <h5>Dashboard Filters</h5>
            <div className='dashboard-controls-grid'>
                {inputControlsData.map((ic) => {
                    if (ic.state?.options) {
                        // Check if this should be a multi-select dropdown
                        if (ic.type === 'multiSelect') {
                            return (
                                <MultiSelectDropdown
                                    key={ic.id}
                                    label={ic.label}
                                    options={ic.state.options}
                                    name={ic.id}
                                    isLoading={loadingDependencies[ic.id] || false}
                                    handleChange={(selectedValues) => handleInputChange(selectedValues, ic.id )}
                                    disabled={!isChartLoaded}
                                />
                            );
                        } else {
                            // Regular dropdown
                            return (
                                <Dropdown
                                    key={ic.id}
                                    label={ic.label}
                                    options={ic.state.options}
                                    name={ic.id}
                                    origSelectedValue={ic.state.value || ''}
                                    handleChange={(newValue) => handleInputChange(newValue, ic.id)}
                                    disabled={!isChartLoaded}
                                />
                            );
                        }
                    }
                    
                    return null;
                })}
            </div>
        </div>
    );
};
