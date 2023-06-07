import React, { useState, useEffect } from "react";
import { Input, Select } from "antd";
import "../../../Styles/CompanyInformation.module.css";

const CompanyInformationComponent = ({
  companies,
  isCompany,
  setCurrentCompany,
  setCurrentPartner,
}) => {
  const [selectedCompany, setSelectedCompany] = useState({});

  const handleCompanySelect = (value) => {
    const company = companies.find((c) => c.name === value);
    setSelectedCompany(company || {});
    if (isCompany) {
      setCurrentCompany(company || {});
    } else {
      setCurrentPartner(company || {});
    }
  };

  const setInformation = () => {};

  return (
    <div className={"container"}>
      <h3>{isCompany ? "Firma" : "Partner"}</h3>
      <div className="form-column">
        <div className="form-row">
          <div className="form-label">Ime:</div>
          <div className="form-input">
            <Select
              showSearch
              placeholder="Pronadjite firmu"
              onSelect={handleCompanySelect}
            >
              {companies.map((company) => (
                <Select.Option key={company.id} value={company.name}>
                  {company.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">Adresa:</div>
          <div className="form-input">
            <Input disabled value={selectedCompany.address}></Input>
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">Grad:</div>
          <div className="form-input">
            <Input disabled value={selectedCompany.city} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">Director:</div>
          <div className="form-input">
            <Input disabled value={selectedCompany.director} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">PIB:</div>
          <div className="form-input">
            <Input disabled value={selectedCompany.pib} />
          </div>
        </div>
      </div>
      <div className="form-column">
        <div className="form-row">
          <div className="form-label">MB:</div>
          <div className="form-input">
            <Input disabled value={selectedCompany.mb} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">Sifra delatnosti:</div>
          <div className="form-input">
            <Input disabled value={selectedCompany.sifra_delatnosti} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">Telefon:</div>
          <div className="form-input">
            <Input disabled value={selectedCompany.phone} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">Email:</div>
          <div className="form-input">
            <Input disabled value={selectedCompany.email} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">Tekuci racun:</div>
          <div className="form-input">
            <Input disabled value={selectedCompany.tekuci_racun} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInformationComponent;
