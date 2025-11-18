import { Document, Page } from 'react-pdf';

export const Viewer = ({pdfBlob, onDocumentLoadSuccess, pageNumber}) => {
    return (
        <>
            {/* Document Rendering */}
            <div style={{ height: 'auto', overflowY: 'auto', background: '#ccc' }}>
                <Document
                    file={pdfBlob} // Pass the generated Blob data here
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<div>Loading Document...</div>}
                >
                    <Page pageNumber={pageNumber} />
                </Document>
            </div>
        </>
    );
};
