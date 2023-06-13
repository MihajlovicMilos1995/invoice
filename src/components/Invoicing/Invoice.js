import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import CompanyInformationComponent from "./Info/CompanyInformationComponent";
import InvoiceInformationComponent from "./Info/InvoiceInformationComponent";
import InvoiceTableComponent from "./Info/InvoiceTableComponent";
import AdditionalInformationComponent from "./Info/AdditionalInformationComponent";
import InvoiceTemplate from "./InvoiceTemplate";
import PartnerInformationComponent from "./Info/PartnerInformationComponent";

import "../../Styles/Invoice.css";
import { Button, Modal } from "antd";

const Invoice = () => {
  //get information form database
  const [companies, setCompanies] = useState([{}]);
  const [partners, setPartners] = useState([{}]);
  //props to pass to modal
  const [currentCompany, setCurrentCompany] = useState({});
  const [currentPartner, setCurrentPartner] = useState({});
  const [totalValue, setTotalValue] = useState();
  const [invoiceData, setInvoiceData] = useState({});
  const [additionalInformationProps, setAdditionalInformationProps] = useState({
    uplacenoAvansno: 0 || null,
    paymentTotal: 0 || null,
  });

  const [tableInformation, setTableInformation] = useState([{}]);

  const [invoiceInformation, setInvoiceInformation] = useState([
    {
      currentCompany,
      currentPartner,
      totalValue,
      invoiceData,
      additionalInformationProps,
      tableInformation,
    },
  ]);

  useEffect(() => {
    setInvoiceInformation((prevState) => ({
      ...prevState,
      currentCompany,
      currentPartner,
      totalValue,
      invoiceData,
      additionalInformationProps,
      tableInformation,
    }));
  }, [
    currentCompany,
    currentPartner,
    totalValue,
    additionalInformationProps,
    tableInformation,
    invoiceData,
  ]);

  //modal manipulation
  const [isModalOpen, setIsModalOpen] = useState(false);

  const invoiceRef = useRef();

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
    <div>
      <div
        className="invoice-container"
        style={{ padding: "5px" }}
        ref={invoiceRef}
      >
        <CompanyInformationComponent
          companies={companies}
          setCurrentCompany={setCurrentCompany}
        />

        <div className="company-partner-container">
          <div className="company-information-container">
            <InvoiceInformationComponent
              setInvoiceData={setInvoiceData}
              currentCompany={currentCompany}
            />
          </div>
          <div className="partner-information-container">
            <PartnerInformationComponent
              companies={partners}
              setCurrentPartner={setCurrentPartner}
            />
          </div>
        </div>

        <hr />

        <div className="table-container">
          <InvoiceTableComponent
            setTotalValue={setTotalValue}
            setTableInformation={setTableInformation}
          />
        </div>

        <div className="additional-information-container">
          <AdditionalInformationComponent
            totalValue={totalValue}
            currentCompany={currentCompany}
            currentPartner={currentPartner}
            setAdditionalInformationProps={setAdditionalInformationProps}
          />
        </div>
      </div>

      <Button onClick={openModal}>PDF</Button>
      {isModalOpen && (
        <>
          <InvoiceTemplate
            invoiceInformation={invoiceInformation}
            isModalOpen={isModalOpen}
            onCancel={closeModal}
          />
        </>
      )}
    </div>
  );
};

export default Invoice;
