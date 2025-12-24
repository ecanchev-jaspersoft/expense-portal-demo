import { useEffect, useState } from 'react';
import './Dashboard.css';
import './viz.css';
import Sidebar from '../../sections/Sidebar/Sidebar';
import { useAuth } from '../../context/AuthContext';

import { CHARTS, BOOLEAN_TEXT } from '../../utils/Constants';

const Dashboard = () => {
    const dashboardLikeReports = CHARTS.filter(
        (chart) => chart.name === 'Financial Health & Performance' || chart.name === 'Customer & Market Groth'
    );
    const { dispatch, state } = useAuth();
    const [selectedChart, setSelectedChart] = useState(null);
    const [inputControlsData, setInputControlsData] = useState([]);
    const [inputControlsDataForInteractiveDashboard, setInputControlsDataForInteractiveDashboard] = useState([]);
    const [reportViz, setReportViz] = useState(null);
    const [isChartLoaded, setIsChartLoaded] = useState(false);

    const isPageReportSelected = () => {
        return state.selectedPage && state.selectedPage === 'pageReport';
    };

    useEffect(() => {
        const selectedDashboard = isPageReportSelected() ? CHARTS[0] : dashboardLikeReports[1];
        setSelectedChart(selectedDashboard);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.selectedPage]);

    useEffect(() => {
        if (!selectedChart) {
            return;
        }
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
                if (!isPageReportSelected()) {
                    v.inputControls({
                        container: '#theInputControls',
                        resource: selectedChart.resource,
                        success: (icData) => {
                            setInputControlsData(icData);
                        },
                        error: () => setInputControlsData([]),
                        events: {
                            change: (params) => {
                                setInputControlsDataForInteractiveDashboard(params);
                            },
                        },
                    });
                } else {
                    v.inputControls({
                        resource: selectedChart.resource,
                        success: (icData) => {
                            setInputControlsData(icData);
                        },
                        error: () => setInputControlsData([]),
                    });
                }
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
                });
                setReportViz(theReportViz);
            }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedChart, dispatch]);

    const handleChange = (newValue, icName) => {
        let strValue = newValue;
        if (isPageReportSelected()) {
            // then we have to convert the boolean to string
            strValue = newValue ? BOOLEAN_TEXT.TRUE : BOOLEAN_TEXT.FALSE;
        }
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
        if (!isPageReportSelected()) {
            reportViz.params(inputControlsDataForInteractiveDashboard).run();
            return;
        }
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
                console.error(error);
            }
        );
    };

    return (
        <main className='dashboard-page h-main-section'>
            {isPageReportSelected() && (
                <Sidebar
                    inputControlsData={inputControlsData}
                    handleSwitchButtonChange={handleChange}
                    handleUpdateChart={handleUpdateChart}
                    handleDownloadPdf={handleDownloadPdf}
                />
            )}
            {!isPageReportSelected() && (
                <section className='sidebar'>
                    <div id='theInputControls'></div>
                    <div className='sidebar-buttons'>
                        <button className='btn btn-primary' onClick={handleUpdateChart}>
                            Update Chart
                        </button>
                    </div>
                </section>
            )}
            <section className='main-content'>
                {/* Provide container to render your visualization */}
                <div id='viz-container'></div>
            </section>
            {isChartLoaded && isPageReportSelected() && (
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
