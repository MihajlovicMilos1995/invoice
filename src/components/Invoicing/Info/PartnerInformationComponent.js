import React, { useState, useEffect } from "react";
import { Input, Select } from "antd";
import styles from "../../../Styles/PartnerInformation.module.css";

const PartnerInformationComponent = ({ companies, setCurrentPartner }) => {
  const [selectedPartner, setSelectedPartner] = useState({});

  const handlePartnerSelect = (value) => {
    const partner = companies.find((c) => c.name === value);
    setSelectedPartner(partner || {});
    setCurrentPartner(partner || {});
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.label}>Ime:</div>
        <div className={styles.input}>
          <Select
            showSearch
            placeholder="Pronadjite Partnera"
            onSelect={handlePartnerSelect}
            style={{ width: "150px" }}
          >
            {companies.map((partner) => (
              <Select.Option key={partner.id} value={partner.name}>
                {partner.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className={styles.label}>Adresa:</div>
        <div className={styles.input}>
          <Input disabled value={selectedPartner.address}></Input>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Grad:</div>
        <div className={styles.input}>
          <Input disabled value={selectedPartner.city} />
        </div>
        <div className={styles.label} style={{ marginLeft: "18px" }}>
          PIB:
        </div>
        <div className={styles.input}>
          <Input disabled value={selectedPartner.pib} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>MB:</div>
        <div className={styles.input}>
          <Input disabled value={selectedPartner.mb} />
        </div>
        <div className={styles.label}>Telefon:</div>
        <div className={styles.input}>
          <Input disabled value={selectedPartner.phone} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Email:</div>
        <div className={styles.input}>
          <Input disabled value={selectedPartner.email} />
        </div>
        <div className={styles.label}>Tekuci racun:</div>
        <div className={styles.input}>
          <Input disabled value={selectedPartner.tekuci_racun} />
        </div>
      </div>
    </div>
  );
};

export default PartnerInformationComponent;
