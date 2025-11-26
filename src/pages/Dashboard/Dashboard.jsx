import { useEffect, useState } from 'react';
import './Dashboard.css';
import './viz.css';
import Sidebar from '../../sections/Sidebar/Sidebar';
import { useAuth } from '../../context/AuthContext';

import { CHARTS, BOOLEAN_TEXT } from '../../utils/Constants';

const Dashboard = () => {
    const [selectedChart] = useState(CHARTS[0]);
    const [inputControlsData, setInputControlsData] = useState([]);
    const [reportViz, setReportViz] = useState(null);
    const [isChartLoaded, setIsChartLoaded] = useState(false);
    const { dispatch } = useAuth();

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
                dispatch({ type: 'SET_V_OBJECT', payload: v });
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
                const theReportViz = v.report({
                    container: '#viz-container',
                    resource: selectedChart.resource,
                    error: (e) => {
                        console.error(e);
                    },
                    success: () => {
                        setIsChartLoaded(true);
                    },

                    // events: {
                    //     reportCompleted: (status, error) => {
                    //         if ('ready' === status && !error && automaticPdf) {
                    //             setAutomaticPdf(false);
                    //             handlePdfConversion();
                    //         }
                    //     },
                    // },
                });
                setReportViz(theReportViz);
            }
        );
    }, [selectedChart, dispatch]);

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
    };

    const handleUpdateChart = () => {
        const paramsReport = inputControlsData.reduce((accum, icData) => {
            accum[icData.id] = [icData.state.value];
            return accum;
        }, {});
        reportViz.params(paramsReport).run();
    };
    const handleDownloadPdf = () => {
        reportViz.export(
            { outputFormat: 'pdf' },
            (link) => {
                const url = link.href ? link.href : link;
                window.location.href = url;
            },
            (error) => {
                alert('PDF Export failed on the server. Error: ' + error.message);
                console.log(error);
            }
        );
    };

    return (
        <main className='dashboard-page h-main-section'>
            <Sidebar
                inputControlsData={inputControlsData}
                handleSwitchButtonChange={handleChange}
                handleUpdateChart={handleUpdateChart}
                handleDownloadPdf={handleDownloadPdf}
            />
            <section className='main-content'>
                {/* Provide container to render your visualization */}
                <div id='viz-container'></div>
            </section>
            {isChartLoaded && (
                <section className='image-column'>
                    <div className='image-row'>
                        <img src='right_sidebar.png' alt='Image 2' />
                    </div>
                </section>
            )}
        </main>
    );
};

export default Dashboard;
