import { DOM_ELEMENT_IDS, PAGE_TYPES } from '../../../utils/Constants';
import { useAuth } from '../../../context/AuthContext';
import { ChartSelector } from './ChartSelector';

/**
 * VisualizationContainer component - Container for the JasperReports visualization
 * The visualization library renders charts into this container element
 */
export const VisualizationContainer = ({ chartOptions, selectedChartName, handleChartSwitch }) => {
    const { state } = useAuth();
    return (
        <section className='main-content'>
            {state.selectedPage === PAGE_TYPES.DASHBOARD && chartOptions && (
                <ChartSelector 
                    chartOptions={chartOptions} 
                    selectedChartName={selectedChartName} 
                    handleChartSwitch={handleChartSwitch} 
                />
            )}
            <div id={DOM_ELEMENT_IDS.VIZ_CONTAINER} className={state.selectedPage === PAGE_TYPES.DASHBOARD ? 'no-margin' : ''}></div>
        </section>
    );
};
