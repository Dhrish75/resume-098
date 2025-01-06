// Updated Resume Component
// Updated Resume Component with Three Templates
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./TemplateSelection.css";

const TemplateSelection = () => {
  const location = useLocation();
  const formData = location.state || {}; // Get the form data passed from Details.js

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const selectTemplate = (templateName) => {
    setSelectedTemplate(templateName);
  };

  const renderSelectedTemplate = () => {
    if (!formData) {
      return <p>Loading user data...</p>;
    }

    if (selectedTemplate === "Template1") {
      return <Template1 formData={formData} />;
    } else if (selectedTemplate === "Template2") {
      return <Template2 formData={formData} />;
    }
    return <p>Please select a template to preview.</p>;
  };

  const handleDownload = async () => {
    const templateElement = document.querySelector(".selected-template"); // Select the template
    if (!templateElement) {
      alert("Please select a template first.");
      return;
    }

    // Convert the template to an image and generate the PDF
    const canvas = await html2canvas(templateElement);
    const imageData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("portrait", "px", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imageData, "PNG", 0, 0, pageWidth, pageHeight);
    pdf.save("Resume_Template.pdf");
  };

  return (
    <div className="template-selection">
      <h2 className="subtitle">Select a Template</h2>

      <div className="template-preview-container">
        {/* Display Template 1 Preview */}
        <div className="template-preview">
          <h4>Template 1</h4>
          <div className="template-box">
            <Template1 formData={formData} />
          </div>
          <button
            className="btn btn-primary mt-2"
            onClick={() => selectTemplate("Template1")}
          >
            Select Template 1
          </button>
        </div>

        {/* Display Template 2 Preview */}
        <div className="template-preview">
          <h4>Template 2</h4>
          <div className="template-box">
            <Template2 formData={formData} />
          </div>
          <button
            className="btn btn-secondary mt-2"
            onClick={() => selectTemplate("Template2")}
          >
            Select Template 2
          </button>
        </div>
      </div>

      <div className="selected-template">{renderSelectedTemplate()}</div>

      {/* Download Button */}
      <div className="d-grid gap-2 col-6 mx-auto mt-4">
        <button
          className="btn btn-success"
          onClick={handleDownload}
          disabled={!selectedTemplate}
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default TemplateSelection;
