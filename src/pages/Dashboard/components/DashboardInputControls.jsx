import './DashboardInputControls.css';
import { Dropdown } from '../../../utils/InputControls/Dropdown/Dropdown';
import { FORBIDDEN_INPUT_CONTROLS, BOOLEAN_TEXT } from '../../../utils/Constants';

/**
 * DashboardInputControls component - Custom input controls for dashboard mode
 * @param {Object} props - Component props
 * @param {Array} props.inputControlsData - Input controls data from the visualization
 * @param {Function} props.handleInputChange - Handler for input control changes
 */
export const DashboardInputControls = ({ inputControlsData, handleInputChange }) => {
    if (!inputControlsData || inputControlsData.length === 0) {
        return null;
    }

    return (
        <div className='dashboard-input-controls'>
            <h5>Dashboard Filters</h5>
            <div className='dashboard-controls-grid'>
                {inputControlsData.map((ic) => {
                    if (ic.state?.options) {
                        return (
                            <Dropdown
                                key={ic.id}
                                label={ic.label}
                                options={ic.state.options}
                                name={ic.id}
                                origSelectedValue={ic.state.value || ''}
                                handleChange={(newValue) => handleInputChange(newValue, ic.id)}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};
