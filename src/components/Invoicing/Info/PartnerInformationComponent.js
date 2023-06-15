import React, { useState } from "react";
import { Input, Select } from "antd";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
      <fieldset style={{ padding: "5px" }} className="border rounded-3">
        <legend style={{ fontSize: "20px" }} className="float-none w-auto px-3">
          Partner
        </legend>
        <Row>
          <Col sm={6}>
            <div className={styles["form-row"]}>
              <div className={styles["form-label"]}>Ime:</div>
              <div className={styles["form-input"]}>
                <Select
                  showSearch
                  placeholder="Pronadjite partnera"
                  onSelect={handlePartnerSelect}
                >
                  {companies.map((company, id) => (
                    <Select.Option key={id} value={company.name}>
                      {company.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </div>

            <div className={styles["form-row"]}>
              <div className={styles["form-label"]}>Adresa:</div>
              <div className={styles["form-input"]}>
                <Input disabled value={selectedPartner.address}></Input>
              </div>
            </div>

            <div className={styles["form-row"]}>
              <div className={styles["form-label"]}>Grad:</div>
              <div className={styles["form-input"]}>
                <Input disabled value={selectedPartner.city} />
              </div>
            </div>

            <div className={styles["form-row"]}>
              <div className={styles["form-label"]}>Director:</div>
              <div className="form-input">
                <Input disabled value={selectedPartner.director} />
              </div>
            </div>
            <div className={styles["form-row"]}>
              <div className={styles["form-label"]}>Email:</div>
              <div className={styles["form-input"]}>
                <Input disabled value={selectedPartner.email} />
              </div>
            </div>
          </Col>

          <Col sm={6}>
            <div className={styles["form-row"]}>
              <div className={styles["form-label"]}>PIB:</div>
              <div className={styles["form-input"]}>
                <Input disabled value={selectedPartner.pib} />
              </div>
            </div>

            <div className={styles["form-row"]}>
              <div className={styles["form-label"]}>MB:</div>
              <div className={styles["form-input"]}>
                <Input disabled value={selectedPartner.mb} />
              </div>
            </div>

            <div className={styles["form-row"]}>
              <div className={styles["form-label"]}>Sifra delatnosti:</div>
              <div className={styles["form-input"]}>
                <Input disabled value={selectedPartner.sifra_delatnosti} />
              </div>
            </div>

            <div className={styles["form-row"]}>
              <div className={styles["form-label"]}>Telefon:</div>
              <div className={styles["form-input"]}>
                <Input disabled value={selectedPartner.phone} />
              </div>
            </div>

            <div className={styles["form-row"]}>
              <div className={styles["form-label"]}>Tekuci racun:</div>
              <div className={styles["form-input"]}>
                <Input disabled value={selectedPartner.tekuci_racun} />
              </div>
            </div>
          </Col>
        </Row>
      </fieldset>
    </div>
  );
};

export default PartnerInformationComponent;
