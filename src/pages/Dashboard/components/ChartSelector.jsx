import { Dropdown } from '../../../utils/InputControls/Dropdown/Dropdown';

/**
 * ChartSelector component - Dropdown to switch between different chart views
 * @param {Object} props - Component props
 * @param {Array<{value: string, label: string}>} props.chartOptions - Available chart options
 * @param {string} props.selectedChartName - Currently selected chart name
 * @param {Function} props.handleChartSwitch - Handler for chart selection changes
 */
export const ChartSelector = ({ chartOptions, selectedChartName, handleChartSwitch }) => {
    if (!chartOptions || !selectedChartName) {
        return null;
    }

    return (
        <section className='chart-selector-section'>
            <Dropdown
                options={chartOptions}
                label='Select Chart'
                name='chartSelector'
                origSelectedValue={selectedChartName}
                handleChange={handleChartSwitch}
            />
        </section>
    );
};
