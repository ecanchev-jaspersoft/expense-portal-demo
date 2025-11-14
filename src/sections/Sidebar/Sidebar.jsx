import { CHARTS } from '../../utils/Constants';
import './Sidebar.css';
const Sidebar = ({ selectedChart, setSelectedChart }) => {
    return (
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
    );
};

export default Sidebar;
