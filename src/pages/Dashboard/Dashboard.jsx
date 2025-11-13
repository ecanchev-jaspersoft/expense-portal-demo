import { useEffect, useState } from 'react';
import './Dashboard.css';
import './viz.css';
import SwitchButton from '../InputControls/SwitchButton';

import { CHARTS, FORBIDDEN_INPUT_CONTROLS, BOOLEAN_TEXT } from './Constants';

const Dashboard = () => {
    const [selectedChart, setSelectedChart] = useState(CHARTS[0]);
    const [inputControlsData, setInputControlsData] = useState([]);
    const [reportViz, setReportViz] = useState(null);

    useEffect(() => {
        if (!window.visualize) {
            console.error('visualize.js library is not loaded.');
            return;
        }
        window.visualize(
            {
                auth: {
                    name: 'superuser',
                    password: 'superuser',
                },
            },
            (v) => {
                if ('report' !== selectedChart?.type) {
                    // TODO: Might need to add logic for other viz types
                    v('#viz-container').adhocView({
                        resource: selectedChart.resource,
                        error: (e) => {
                            console.log(e);
                        },
                    });
                    return;
                }

                // Fetch the input controls
                v.inputControls({
                    resource: selectedChart.resource,
                    success: (icData) => {
                        setInputControlsData(icData);
                    },
                    error: () => setInputControlsData([]),
                });
                // Render the report and store the viz instance
                setReportViz(
                    v.report({
                        container: '#viz-container',
                        resource: selectedChart.resource,
                        error: (e) => {
                            console.log(e);
                        },
                    })
                );
            }
        );
    }, [selectedChart]);

    const handleChange = (newValue, icName) => {
        const strValue = newValue ? BOOLEAN_TEXT.TRUE : BOOLEAN_TEXT.FALSE;
        const icsUpdated = inputControlsData.map((ic) => {
            if (ic.id !== icName) {
                return ic;
            }
            return {
                ...ic,
                state: {
                    ...ic.state,
                    value: strValue,
                },
            };
        });
        setInputControlsData(icsUpdated);

        const paramsReport = icsUpdated.reduce((accum, icData) => {
            accum[icData.id] = [icData.state.value];
            return accum;
        }, {});
        console.log('Params to send to report:', paramsReport);
        reportViz.params(paramsReport).run();
    };

    const formatOriginalValue = (ic) => {
        if (!ic.state || !ic.state.value) {
            return false;
        }
        return ic.state.value === BOOLEAN_TEXT.TRUE;
    };

    return (
        <main className='dashboard-page h-main-section'>
            <section className='sidebar'>
                <h2>Charts</h2>
                <ul>
                    {CHARTS.map((chart) => (
                        <li
                            key={chart.resource}
                            className={chart.resource === selectedChart.resource ? 'active' : ''}
                            onClick={() => setSelectedChart(chart)}
                        >
                            {chart.name}
                        </li>
                    ))}
                </ul>
            </section>
            <section className='main-content'>
                <h1>Welcome to the Dashboard</h1>

                {CHARTS[0].resource === selectedChart?.resource && inputControlsData?.length > 0 && (
                    <div className='switch-button-row'>
                        {inputControlsData.map((icToRender) => {
                            if (!FORBIDDEN_INPUT_CONTROLS.includes(icToRender.id)) {
                                return (
                                    <SwitchButton
                                        onChange={(newValue) => handleChange(newValue, icToRender.id)}
                                        name={icToRender.id}
                                        label={icToRender.label}
                                        origIsChecked={formatOriginalValue(icToRender)}
                                    />
                                );
                            }
                        })}
                    </div>
                )}

                {/* Provide container to render your visualization */}
                <div id='viz-container'></div>
            </section>
        </main>
    );
};

export default Dashboard;
