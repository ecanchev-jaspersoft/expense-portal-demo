import { useEffect, useState } from 'react';
import './Dashboard.css';
import './viz.css';
import Sidebar from '../../sections/Sidebar/Sidebar';

import { CHARTS, BOOLEAN_TEXT } from '../../utils/Constants';

const Dashboard = ({ isLoadingPDFGeneration, handlePdfConversion, showDashboard }) => {
    const [selectedChart] = useState(CHARTS[0]);
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
                            console.error(e);
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
                            console.error(e);
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
        reportViz.params(paramsReport).run();
    };

    return (
        <main className='dashboard-page h-main-section'>
            <Sidebar
                inputControlsData={inputControlsData}
                handleSwitchButtonChange={handleChange}
                isLoading={isLoadingPDFGeneration}
                handlePdfConversion={handlePdfConversion}
            />
            {showDashboard && (
                <section className='main-content'>
                    <h1>Welcome to the Dashboard</h1>

                    {/* Provide container to render your visualization */}
                    <div id='viz-container'></div>
                </section>
            )}
        </main>
    );
};

export default Dashboard;
