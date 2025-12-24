import { DOM_ELEMENT_IDS } from '../../../utils/Constants';

/**
 * VisualizationContainer component - Container for the JasperReports visualization
 * The visualization library renders charts into this container element
 */
export const VisualizationContainer = () => {
    return (
        <section className='main-content'>
            <div id={DOM_ELEMENT_IDS.VIZ_CONTAINER}></div>
        </section>
    );
};
