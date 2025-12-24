/**
 * ImageColumn component - Right sidebar displaying supplementary image
 * @param {Object} props - Component props
 * @param {boolean} props.isVisible - Whether the image column should be displayed
 */
export const ImageColumn = ({ isVisible }) => {
    if (!isVisible) {
        return null;
    }

    return (
        <section className='image-column'>
            <div className='image-row'>
                <img src='right_sidebar.png' alt='Image 2' />
            </div>
        </section>
    );
};
