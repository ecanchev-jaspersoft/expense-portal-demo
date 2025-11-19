import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf'; // Note the named import for modern versions

/**
 * Converts a target HTML element (like your chart) into a PDF Blob.
 * @param {string} elementId - The ID of the HTML element to capture.
 * @returns {Promise<Blob>} - The PDF file data as a Blob.
 */
export const generateChartPdf = async (elementId) => {
    const input = document.getElementById(elementId);

    if (!input) {
        throw new Error(`Element with ID ${elementId} not found.`);
    }

    // 1. Capture the visual content
    const canvas = await html2canvas(input, {
        scale: 3,
        logging: false,
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);

    // 2. Initialize jsPDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = 200; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    const zoomFactor = 1.5; // Adjust this value to zoom in or out
    const imgWidth = pdfWidth * zoomFactor;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
        pdf.addPage();
        position = position - pdfHeight;
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
    }

    return pdf.output('blob');
};
