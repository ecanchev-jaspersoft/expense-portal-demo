import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { generateChartPdf } from '../../utils/pdfGenerator';
import Dashboard from '../Dashboard/Dashboard';
import './ReportViewer.css';

// ⚠️ REQUIRED SETUP for react-pdf to work ⚠️
// It needs a worker file to process the PDF data. Using a CDN is the simplest option.
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url, // This ensures the path is resolved correctly relative to the module
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
          <Dashboard />

          <button onClick={handleGenerateAndView} disabled={isLoading} style={{ margin: '20px 0', padding: '10px 20px' }}>
              {isLoading ? 'Generating PDF...' : 'Generate PDF & View'}
          </button>

          {/* 2. The PDF Viewer Look-Alike */}
          {pdfBlob && (
              <div style={{ marginTop: '30px', border: '1px solid #1e88e5', borderRadius: '4px' }}>
                  <h3>PDF Report Viewer</h3>
                  <hr />

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

                  {/* Document Rendering */}
                  <div style={{ height: '70vh', overflowY: 'auto', background: '#ccc' }}>
                      <Document
                          file={pdfBlob} // Pass the generated Blob data here
                          onLoadSuccess={onDocumentLoadSuccess}
                          loading={<div>Loading Document...</div>}
                      >
                          <Page
                              pageNumber={pageNumber}
                              width={700} // Optional: Set a fixed width for consistent viewing
                          />
                      </Document>
                  </div>
              </div>
          )}
      </div>
  );
};

export default ReportViewer;