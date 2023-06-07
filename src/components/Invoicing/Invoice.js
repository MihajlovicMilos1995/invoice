import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import CompanyInformationComponent from "./Info/CompanyInformationComponent";
import InvoiceInformationComponent from "./Info/InvoiceInformationComponent";
import InvoiceTableComponent from "./Info/InvoiceTableComponent";
import AdditionalInformationComponent from "./Info/AdditionalInformationComponent";
import InvoiceTemplate from "../Partners/Partners";

import "../../Styles/Invoice.css";
import { Button, Modal } from "antd";

const Invoice = () => {
  const [companies, setCompanies] = useState([{}]);
  const [partners, setPartners] = useState([{}]);
  const [currentCompany, setCurrentCompany] = useState({});
  const [currentPartner, setCurrentPartner] = useState({});
  const [totalValue, setTotalValue] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoicePDF, setInvoicePDF] = useState(null);

  const invoiceRef = useRef();

  const exportAsPDF = () => {
    const input = invoiceRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      const pdfBlob = pdf.output("blob"); // Generate the PDF as a Blob
      setInvoicePDF(pdfBlob); // Set the PDF Blob in state
      openModal(); // Open the modal to preview the invoice
    });
  };

  const downloadPDF = () => {
    if (invoicePDF) {
      const url = URL.createObjectURL(invoicePDF);
      const link = document.createElement("a");
      link.href = url;
      link.download = "invoice.pdf";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchCompanies();
    fetchPartners();
  }, []);

  const fetchCompanies = () => {
    axios
      .get("http://localhost:3000/companies")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  };
  const fetchPartners = () => {
    axios
      .get("http://localhost:3000/partners")
      .then((response) => {
        setPartners(response.data);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  };

  return (
    <div className="invoice-container" ref={invoiceRef}>
      <CompanyInformationComponent
        companies={companies}
        isCompany={true}
        setCurrentCompany={setCurrentCompany}
      />

      <div className="company-partner-container">
        <div className="company-information-container">
          <InvoiceInformationComponent />
        </div>
        <div className="partner-information-container">
          <CompanyInformationComponent
            companies={partners}
            isCompany={false}
            setCurrentPartner={setCurrentPartner}
          />
        </div>
      </div>

      <hr />

      <div className="table-container">
        <InvoiceTableComponent setTotalValue={setTotalValue} />
      </div>

      <div className="additional-information-container">
        <AdditionalInformationComponent
          totalValue={totalValue}
          currentCompany={currentCompany}
          currentPartner={currentPartner}
        />
      </div>
      <Button onClick={exportAsPDF}>PDF</Button>
      {isModalOpen && (
        <Modal
          onCancel={closeModal}
          open={isModalOpen}
          width={1000}
          className="custom-modal"
          centered
          destroyOnClose
        >
          <InvoiceTemplate invoicePDF={invoicePDF} />
          <Button onClick={downloadPDF}>Download PDF</Button>
        </Modal>
      )}
    </div>
  );
};

export default Invoice;
