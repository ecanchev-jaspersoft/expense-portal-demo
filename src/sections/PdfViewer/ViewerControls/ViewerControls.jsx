import './ViewerControls.css';
export const ViewerControls = ({ setPageNumber, pageNumber, numPages }) => {
    return (
        <>
            {/* Viewer Controls */}
            <div className='viewer-controls'>
                <button disabled={pageNumber <= 1} onClick={() => setPageNumber((p) => p - 1)}>
                    &lt;
                </button>
                <span>
                    Page {pageNumber} of <b>{numPages || '--'}</b>
                </span>
                <button disabled={pageNumber >= numPages} onClick={() => setPageNumber((p) => p + 1)}>
                    &gt;
                </button>
            </div>
        </>
    );
};
