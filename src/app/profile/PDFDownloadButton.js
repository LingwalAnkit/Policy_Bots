import React, { useState, useEffect } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';

const PDFDownloadButton = () => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const loadFormData = () => {
      try {
        const allKeys = Object.keys(localStorage);
        console.log('All localStorage keys:', allKeys);

        const storedData = localStorage.getItem('userdata');
        console.log('Raw data from localStorage:', storedData);
        
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          console.log('Parsed data:', parsedData);
          setFormData(parsedData);
        } else {
          console.log('No data found in localStorage for key "profileFormData"');
        }
      } catch (error) {
        console.error('Error loading form data:', error);
      }
    };

    loadFormData();
    window.addEventListener('storage', loadFormData);
    return () => window.removeEventListener('storage', loadFormData);
  }, []);

  const generatePDF = async () => {
    try {
      console.log('Current formData state:', formData);

      // Attempt to retrieve data directly from localStorage
      const storedData = localStorage.getItem('profileFormData');
      console.log('Data retrieved directly from localStorage:', storedData);

      let dataToUse = formData;
      if (!dataToUse && storedData) {
        dataToUse = JSON.parse(storedData);
        console.log('Using data directly from localStorage:', dataToUse);
      }

      if (!dataToUse || typeof dataToUse !== 'object' || Object.keys(dataToUse).length === 0) {
        console.error('Invalid form data:', dataToUse);
        alert('No valid profile data found. Please fill out and submit the form first.');
        return;
      }

      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { height } = page.getSize();
      let yOffset = height - 50;

      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const addText = (text, fontSize = 12, isBold = false) => {
        console.log('Adding text to PDF:', text);
        page.drawText(text, {
          x: 50,
          y: yOffset,
          size: fontSize,
          font: isBold ? helveticaBoldFont : helveticaFont,
          color: rgb(0, 0, 0),
        });
        yOffset -= fontSize + 5;
      };

      addText('Profile Information', 18, true);
      yOffset -= 10;

      Object.entries(dataToUse).forEach(([key, value]) => {
        if (value) {
          addText(`${key}: ${value}`);
        }
      });

      const pdfBytes = await pdfDoc.save();
      console.log('PDF generated successfully');

      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      saveAs(blob, 'profile_information.pdf');
      console.log('PDF download initiated');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('An error occurred while generating the PDF. Please try again.');
    }
  };

  return (
      <button
      onClick={generatePDF}
      type="button"
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    >
      Download PDF
    </button>
  );
};

export default PDFDownloadButton;