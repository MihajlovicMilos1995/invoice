import React, { useState, useEffect } from "react";
import { Input, Select } from "antd";
import styles from "../../../Styles/CompanyInformation.module.css";

const CompanyInformationComponent = ({ companies, setCurrentCompany }) => {
  const [selectedCompany, setSelectedCompany] = useState({});

  const handleCompanySelect = (value) => {
    const company = companies.find((c) => c.name === value);
    setSelectedCompany(company || {});
    setCurrentCompany(company || {});
  };

  return (
    <div className={styles.container}>
      <div className={styles["form-row"]}>
        <div className={styles["form-label"]}>Ime:</div>
        <div className={styles["form-input"]}>
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
      <div className={styles["form-row"]}>
        <div className={styles["form-label"]}>Adresa:</div>
        <div className={styles["form-input"]}>
          <Input disabled value={selectedCompany.address}></Input>
        </div>
      </div>
      <div className={styles["form-row"]}>
        <div className={styles["form-label"]}>Grad:</div>
        <div className={styles["form-input"]}>
          <Input disabled value={selectedCompany.city} />
        </div>
      </div>

      <div className={styles["form-row"]}>
        <div className={styles["form-label"]}>Director:</div>
        <div className="form-input">
          <Input disabled value={selectedCompany.director} />
        </div>
      </div>

      <div className={styles["form-row"]}>
        <div className={styles["form-label"]}>PIB:</div>
        <div className={styles["form-input"]}>
          <Input disabled value={selectedCompany.pib} />
        </div>
      </div>
      <div className={styles["form-row"]}>
        <div className={styles["form-label"]}>MB:</div>
        <div className={styles["form-input"]}>
          <Input disabled value={selectedCompany.mb} />
        </div>
      </div>

      <div className={styles["form-row"]}>
        <div className={styles["form-label"]}>Sifra delatnosti:</div>
        <div className={styles["form-input"]}>
          <Input disabled value={selectedCompany.sifra_delatnosti} />
        </div>
      </div>

      <div className={styles["form-row"]}>
        <div className={styles["form-label"]}>Telefon:</div>
        <div className={styles["form-input"]}>
          <Input disabled value={selectedCompany.phone} />
        </div>
      </div>
      <div className={styles["form-row"]}>
        <div className={styles["form-label"]}>Email:</div>
        <div className={styles["form-input"]}>
          <Input disabled value={selectedCompany.email} />
        </div>
      </div>
      <div className={styles["form-row"]}>
        <div className={styles["form-label"]}>Tekuci racun:</div>
        <div className={styles["form-input"]}>
          <Input disabled value={selectedCompany.tekuci_racun} />
        </div>
      </div>
    </div>
  );
};

export default CompanyInformationComponent;
