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
        scale: 2,
        logging: false,
    });

    const imgData = canvas.toDataURL('image/png');

    // 2. Initialize jsPDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // 3. Add the captured image to the PDF
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // 4. Output the PDF as a Blob
    return pdf.output('blob');
};