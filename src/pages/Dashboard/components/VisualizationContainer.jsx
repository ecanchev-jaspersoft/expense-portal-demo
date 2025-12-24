import { DOM_ELEMENT_IDS } from '../../../utils/Constants';

export const VisualizationContainer = () => {
    return (
        <section className='main-content'>
            <div id={DOM_ELEMENT_IDS.VIZ_CONTAINER}></div>
        </section>
    );
};
