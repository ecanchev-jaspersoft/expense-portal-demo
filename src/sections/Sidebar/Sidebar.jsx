import './Sidebar.css';
import '../../styles/button.css';
import SwitchButton from '../../utils/InputControls/SwitchButton';
import { FORBIDDEN_INPUT_CONTROLS, BOOLEAN_TEXT } from '../../utils/Constants';

const Sidebar = ({ inputControlsData, handleSwitchButtonChange, handleDownloadPdf, handleUpdateChart }) => {
    const transformOriginalValue = (ic) => {
        if (!ic.state || !ic.state.value) {
            return false;
        }
        return ic.state.value === BOOLEAN_TEXT.TRUE;
    };


    const transformLabel = (label) => {
        return label
            .replace(/_/g, ' ')
            .toLowerCase()
            .split(' ')
            .map((word) => {
                if (word === 'qr') {
                    return word.toUpperCase();
                }
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(' ');
    };

    return (
        <>
            {inputControlsData?.length > 0 && (
                <section className='sidebar'>
                    <h5>Show/Hide Sections</h5>
                    <ul className='switch-button-row'>
                        <li>
                            {inputControlsData.map((icToRender) => {
                                if (!FORBIDDEN_INPUT_CONTROLS.includes(icToRender.id)) {
                                    return (
                                        <SwitchButton
                                            key={icToRender.id}
                                            onChange={(newValue) => handleSwitchButtonChange(newValue, icToRender.id)}
                                            name={icToRender.id}
                                            label={transformLabel(icToRender.label)}
                                            origIsChecked={transformOriginalValue(icToRender)}
                                        />
                                    );
                                }
                            })}
                        </li>
                    </ul>
                    <button className='btn btn-primary' onClick={handleUpdateChart} style={{ margin: '5px' }}>
                        Update Chart
                    </button>
                    <button className='btn btn-secondary' onClick={handleDownloadPdf}>
                        Download PDF
                    </button>
                </section>
            )}
        </>
    );
};

export default Sidebar;
