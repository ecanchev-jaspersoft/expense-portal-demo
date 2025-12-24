import { Dropdown } from '../../../utils/InputControls/Dropdown/Dropdown';

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
