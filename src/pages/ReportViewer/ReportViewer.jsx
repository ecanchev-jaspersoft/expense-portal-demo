import { useState } from 'react';
import { pdfjs } from 'react-pdf';
import { generateChartPdf } from '../../utils/pdfGenerator';
import Dashboard from '../Dashboard/Dashboard';
import './ReportViewer.css';
import { ViewerControls } from '../../sections/PdfViewer/ViewerControls/ViewerControls';
import { Viewer } from '../../sections/PdfViewer/Viewer/Viewer';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url // This ensures the path is resolved correctly relative to the module
).toString();

const ReportViewer = () => {
    const [pdfBlob, setPdfBlob] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateAndView = async () => {
        setIsLoading(true);
        setPdfBlob(null); // Clear previous PDF
        try {
            // Pass the ID of the chart container div
            const blob = await generateChartPdf('viz-container');
            setPdfBlob(blob);
        } catch (error) {
            console.error('PDF generation failed:', error);
            alert('Error generating PDF.');
        } finally {
            setIsLoading(false);
        }
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(1); // Reset to page 1 on successful load
    };

    return (
        <div style={{ padding: '20px' }}>
            {/* 1. The Chart to be converted */}
            <Dashboard
                handlePdfConversion={handleGenerateAndView}
                isLoadingPDFGeneration={isLoading}
                showDashboard={!isLoading && !pdfBlob}
            />

            {pdfBlob && (
                <div style={{ marginTop: '30px', border: '1px solid #1e88e5', borderRadius: '4px' }}>
                    <ViewerControls setPageNumber={setPageNumber} pageNumber={pageNumber} numPages={numPages} />
                    <Viewer pdfBlob={pdfBlob} onDocumentLoadSuccess={onDocumentLoadSuccess} pageNumber={pageNumber} />
                </div>
            )}
        </div>
    );
};

export default ReportViewer;
