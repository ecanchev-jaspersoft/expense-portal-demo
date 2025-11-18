export const ViewerControls = ({setPageNumber, pageNumber, numPages}) => {
    return (
        <>
            {/* Viewer Controls */}
            <div style={{ padding: '10px', textAlign: 'center', backgroundColor: '#e3f2fd' }}>
                <button disabled={pageNumber <= 1} onClick={() => setPageNumber((p) => p - 1)}>
                    &lt; Previous
                </button>
                <span style={{ margin: '0 15px' }}>
                    Page **{pageNumber}** of {numPages || '--'}
                </span>
                <button disabled={pageNumber >= numPages} onClick={() => setPageNumber((p) => p + 1)}>
                    Next &gt;
                </button>
            </div>
        </>
    );
};
