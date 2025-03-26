import React from 'react'
import * as html2pdf from "html2pdf.js";


function TestPDF() {
    const downloadTestPDF = () => {
        const element = document.createElement("div");
        element.innerHTML = "<h1>Hello, PDF!</h1>";
        document.body.appendChild(element);
    
        html2pdf().from(element).save();
    };
    
  return (
    <div>
        <button onClick={downloadTestPDF} className="bg-green-500 text-white px-4 py-2 mt-4">
            Test PDF Download
        </button>
    </div>
  )
}

export default TestPDF
