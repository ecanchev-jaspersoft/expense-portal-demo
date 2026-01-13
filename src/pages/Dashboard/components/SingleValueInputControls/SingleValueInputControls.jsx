import './SingleValueInputControls.css';
import '../../../../styles/button.css';
import SwitchButton from '../../../../utils/InputControls/SwitchButton/SwitchButton';
import { FORBIDDEN_INPUT_CONTROLS, BOOLEAN_TEXT } from '../../../../utils/Constants';
import { Dropdown } from '../../../../utils/InputControls/Dropdown/Dropdown';

const SingleValueInputControls = ({ inputControlsData, handleSwitchButtonChange, handleDownloadPdf, isChartLoaded }) => {
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
                <section className='dashboard-controls-horizontal'>
                    <h5>Show/Hide Sections</h5>
                    <div className='dashboard-controls-grid'>
                        {inputControlsData.map((icToRender) => {
                            if (icToRender.id === 'STATEMENT_TIME') {
                                // dummy dropdown for time range
                                return (
                                    <div key={icToRender.id} className='dashboard-control-item'>
                                        <Dropdown
                                            label={'Time Range'}
                                            options={[
                                                { value: '-5y', label: 'Last 5 Years' },
                                                { value: '-4y', label: 'Last 4 Years' },
                                                { value: '-3y', label: 'Last 3 Years' },
                                                { value: '-2y', label: 'Last 2 Years' },
                                                { value: '-1y', label: 'Last 1 Year' },
                                            ]}
                                            name={icToRender.id}
                                            origSelectedValue={'-5y'}
                                            disabled={!isChartLoaded}
                                        />
                                    </div>
                                );
                            } else if (!FORBIDDEN_INPUT_CONTROLS.includes(icToRender.id)) {
                                return (
                                    <div key={icToRender.id} className='dashboard-control-item'>
                                        <SwitchButton
                                            onChange={(newValue) => handleSwitchButtonChange(newValue, icToRender.id)}
                                            name={icToRender.id}
                                            label={transformLabel(icToRender.label)}
                                            origIsChecked={transformOriginalValue(icToRender)}
                                            disabled={!isChartLoaded}
                                        />
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                    <div className='dashboard-controls-buttons'>
                        <button className='btn btn-secondary' onClick={handleDownloadPdf}>
                            Download PDF
                        </button>
                    </div>
                </section>
            )}
        </>
    );
};

export default SingleValueInputControls;
