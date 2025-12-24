import { useState, useEffect } from 'react';
import { CHART_TYPES, DOM_ELEMENT_IDS, AUTH_ACTIONS, EXPORT_FORMATS } from '../utils/Constants';

/**
 * Custom hook to manage visualization library initialization and rendering
 * @param {Object} selectedChart - The currently selected chart configuration
 * @param {Function} dispatch - Redux dispatch function
 * @param {boolean} isPageReportSelected - Whether page report mode is active
 * @param {Function} setInputControlsData - Setter for input controls data
 * @param {Function} setInputControlsDataForInteractiveDashboard - Setter for interactive dashboard data
 * @returns {Object} Visualization state and handlers
 */
export const useVisualization = (
    selectedChart,
    dispatch,
    isPageReportSelected,
    setInputControlsData,
    setInputControlsDataForInteractiveDashboard
) => {
    const [reportViz, setReportViz] = useState(null);
    const [isChartLoaded, setIsChartLoaded] = useState(false);

    useEffect(() => {
        if (!selectedChart) {
            return;
        }
        if (!window.visualize) {
            console.error('visualize.js library is not loaded.');
            return;
        }

        setIsChartLoaded(false);

        // Initialize JasperReports visualization library with authentication
        window.visualize(
            {
                auth: {
                    name: 'superuser',
                    password: 'superuser',
                },
            },
            (v) => {
                // Store visualization instance in global state for potential reuse
                dispatch({ type: AUTH_ACTIONS.SET_V_OBJECT, payload: v });

                // Handle non-report visualizations (e.g., ad-hoc views)
                if (CHART_TYPES.REPORT !== selectedChart?.type) {
                    v(`#${DOM_ELEMENT_IDS.VIZ_CONTAINER}`).adhocView({
                        resource: selectedChart.resource,
                        error: (e) => {
                            console.error(e);
                        },
                    });
                    return;
                }

                // Setup input controls based on report mode
                if (!isPageReportSelected) {
                    // Interactive dashboard mode: render controls in container with change events
                    v.inputControls({
                        container: `#${DOM_ELEMENT_IDS.INPUT_CONTROLS_CONTAINER}`,
                        resource: selectedChart.resource,
                        success: (icData) => {
                            setInputControlsData(icData);
                        },
                        error: () => setInputControlsData([]),
                        events: {
                            change: (params) => {
                                // Track changes for immediate updates in interactive mode
                                setInputControlsDataForInteractiveDashboard(params);
                            },
                        },
                    });
                } else {
                    // Page report mode: fetch controls without rendering (handled by Sidebar)
                    v.inputControls({
                        resource: selectedChart.resource,
                        success: (icData) => {
                            setInputControlsData(icData);
                        },
                        error: () => setInputControlsData([]),
                    });
                }

                // Render the report visualization
                const theReportViz = v.report({
                    container: `#${DOM_ELEMENT_IDS.VIZ_CONTAINER}`,
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
    }, [selectedChart]);

    const handleUpdateChart = (inputControlsDataForInteractiveDashboard, buildReportParams) => {
        if (!reportViz) return;

        if (!isPageReportSelected) {
            reportViz.params(inputControlsDataForInteractiveDashboard).run();
            return;
        }
        const paramsReport = buildReportParams();
        reportViz.params(paramsReport).run();
    };

    const handleDownloadPdf = () => {
        if (!reportViz) return;

        reportViz.export(
            { outputFormat: EXPORT_FORMATS.PDF },
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

    return {
        reportViz,
        isChartLoaded,
        handleUpdateChart,
        handleDownloadPdf,
    };
};
