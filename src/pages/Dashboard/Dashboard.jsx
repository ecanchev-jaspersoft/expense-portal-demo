import { useEffect, useState } from 'react';
import './Dashboard.css';
import './viz.css';

let theInputControlsData = null;
let theInputControlsViz = null;
let theReportViz = null;
const charts = [
    {
        name: 'Account Statement',
        resource: '/public/Demo_Example/Reports/Account_Statement/Account_Statement',
        type: 'report',
    },
    {
        name: 'Invoice A',
        resource: '/public/Demo_Example/Reports/Invoice/Invoice_A',
        type: 'report',
    },
    {
        name: 'Invoice B',
        resource: '/public/Demo_Example/Reports/Invoice/Invoice_B',
        type: 'report',
    },
    {
        name: 'Invoice C',
        resource: '/public/Demo_Example/Reports/Invoice/Invoice_C',
        type: 'report',
    },
    {
        name: 'Invoice D',
        resource: '/public/Demo_Example/Reports/Invoice/Invoice_D',
        type: 'report',
    },
    {
        name: 'Rental Contract',
        resource: '/public/Demo_Example/Reports/Rental_Contract/Rental_Contract',
        type: 'report',
    },
    {
        name: 'Ticket',
        resource: '/public/Demo_Example/Reports/Tickets/Ticket',
        type: 'report',
    },
];

const Dashboard = () => {
    const [selectedChart, setSelectedChart] = useState(charts[0]);

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
                    v('#viz-container').adhocView({
                        resource: selectedChart.resource,
                        error: (e) => {
                            console.log(e);
                        },
                    });
                    return;
                }

                theInputControlsViz = v.inputControls({
                    resource: selectedChart.resource,
                    success: (icData) => {
                        theInputControlsData = icData;
                        console.log('Input Controls Data:', icData);
                    },
                });
                theReportViz = v.report({
                    container: '#viz-container',
                    resource: selectedChart.resource,
                    error: (e) => {
                        console.log(e);
                    },
                    // Pass and control individual paramaters
                    // params: {
                    //     'SHOW_VISUALS': ['FALSE'],
                    // },
                });
            }
        );
    }, [selectedChart]);

    return (
        <main className='dashboard-page h-main-section'>
            <section className='sidebar'>
                <h2>Charts</h2>
                <ul>
                    {charts.map((chart) => (
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

                {/* Provide container to render your visualization */}
                <div id='viz-container'></div>
            </section>
        </main>
    );
};

export default Dashboard;
