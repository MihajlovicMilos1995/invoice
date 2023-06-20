import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CompanyInformationComponent from "./Info/CompanyInformationComponent";
import InvoiceInformationComponent from "./Info/InvoiceInformationComponent";
import InvoiceTableComponent from "./Info/InvoiceTableComponent";
import AdditionalInformationComponent from "./Info/AdditionalInformationComponent";
import InvoiceTemplate from "./InvoiceTemplate";
import PartnerInformationComponent from "./Info/PartnerInformationComponent";

import "../../Styles/Invoice.css";
import { Button } from "antd";

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
    note:
      "" ||
      "Rok za primedbu 5 dana. Prilikom uplate upisati broj računa u poziv na broj odobrenja u nalogu za prenos:\nDokument je kreiran elektronskom obradom podataka i punovažan je bez pečata i potpisa.",
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
        <Row>
          <Col span={6}>
            <CompanyInformationComponent
              companies={companies}
              setCurrentCompany={setCurrentCompany}
            />
          </Col>
          <Col span={6}>
            <PartnerInformationComponent
              companies={partners}
              setCurrentPartner={setCurrentPartner}
            />
          </Col>
        </Row>
        <Row className="invoiceTableCol" style={{ marginTop: "10px" }}>
          <Col xs={12} sm={12} md={12} lg={4}>
            <InvoiceInformationComponent
              setInvoiceData={setInvoiceData}
              currentCompany={currentCompany}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={8} style={{ marginTop: "25px" }}>
            <InvoiceTableComponent
              setTotalValue={setTotalValue}
              setTableInformation={setTableInformation}
            />
          </Col>
        </Row>

        <hr />

        <Row>
          <Col>
            <AdditionalInformationComponent
              totalValue={totalValue}
              currentCompany={currentCompany}
              currentPartner={currentPartner}
              setAdditionalInformationProps={setAdditionalInformationProps}
            />
          </Col>
        </Row>
      </div>
      <Button
        onClick={openModal}
        disabled={Object.keys(currentCompany).length === 0}
      >
        PDF
      </Button>
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
