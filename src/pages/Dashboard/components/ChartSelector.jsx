import { Tabs } from '../../../utils/InputControls/Tabs/Tabs';

/**
 * ChartSelector component - Tabs to switch between different chart views
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
            <Tabs
                options={chartOptions}
                activeTab={selectedChartName}
                onTabChange={handleChartSwitch}
            />
        </section>
    );
};
