import './MultiValuesInputControls.css';
import { Dropdown } from '../../../../utils/InputControls/Dropdown/Dropdown';
import { MultiSelectDropdown } from '../../../../utils/InputControls/MultiSelectDropdown/MultiSelectDropdown';
import { DatePicker } from '../../../../utils/InputControls/DatePicker/DatePicker';

/**
 * MultiValuesInputControls component - Custom input controls for dashboard mode
 * @param {Object} props - Component props
 * @param {Array} props.inputControlsData - Input controls data from the visualization
 * @param {Function} props.handleInputChange - Handler for input control changes
 * @param {Object} props.loadingDependencies - Loading states for dependent controls
 */
export const MultiValuesInputControls = ({ inputControlsData, handleInputChange, loadingDependencies, isChartLoaded }) => {
    if (!inputControlsData || inputControlsData.length === 0) {
        return null;
    }

    return (
        <div className='dashboard-input-controls'>
            <div className='dashboard-controls-grid'>
                {inputControlsData.map((ic) => {
                    if (ic.state?.options) {
                        // Check if this should be a multi-select dropdown
                        if (ic.type === 'multiSelect') {
                            return (
                                <div key={ic.id} className='dashboard-control-item'>
                                    <MultiSelectDropdown
                                        label={ic.label}
                                        options={ic.state.options}
                                        name={ic.id}
                                        isLoading={loadingDependencies[ic.id] || false}
                                        handleChange={(selectedValues) => handleInputChange(selectedValues, ic.id )}
                                        disabled={!isChartLoaded}
                                    />
                                </div>
                            );
                        } else {
                            // Regular dropdown
                            return (
                                <div key={ic.id} className='dashboard-control-item'>
                                    <Dropdown
                                        label={ic.label}
                                        options={ic.state.options}
                                        name={ic.id}
                                        origSelectedValue={ic.state.value || ''}
                                        handleChange={(newValue) => handleInputChange(newValue, ic.id)}
                                        disabled={!isChartLoaded}
                                    />
                                </div>
                            );
                        }
                    }
                    
                    return null;
                })}
                
                <div className='dashboard-control-item'>
                    <DatePicker
                        label="Date Range"
                        name="date-picker"
                        disabled={!isChartLoaded}
                    />
                </div>
            </div>
        </div>
    );
};
