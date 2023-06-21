import React, { useState, useEffect } from "react";
import { Input, Form } from "antd";
import { Row, Col } from "react-bootstrap";
import styles from "../../../Styles/AdditionalInformation.module.css";
import TextArea from "antd/es/input/TextArea";

const brojUReciSrpski = (broj) => {
  const jedinice = [
    "",
    "jedan",
    "dva",
    "tri",
    "četiri",
    "pet",
    "šest",
    "sedam",
    "osam",
    "devet",
  ];
  const desetice = [
    "",
    "deset",
    "dvadeset",
    "trideset",
    "četrdeset",
    "pedeset",
    "šezdeset",
    "sedamdeset",
    "osamdeset",
    "devedeset",
  ];
  const specijalniBrojevi = {
    11: "jedanaest",
    12: "dvanaest",
    13: "trinaest",
    14: "četrnaest",
    15: "petnaest",
    16: "šesnaest",
    17: "sedamnaest",
    18: "osamnaest",
    19: "devetnaest",
  };
  const hiljade = [
    "",
    "hiljada",
    "dve hiljade",
    "tri hiljade",
    "četiri hiljade",
    "pet hiljada",
    "šest hiljada",
    "sedam hiljada",
    "osam hiljada",
    "devet hiljada",
  ];
  const stotine = [
    "",
    "sto",
    "dvesta",
    "trista",
    "četristo",
    "petsto",
    "šesto",
    "sedamsto",
    "osamsto",
    "devetsto",
  ];
  const milioni = [
    "",
    "milion",
    "dva miliona",
    "tri miliona",
    "četiri miliona",
    "pet miliona",
    "šest miliona",
    "sedam miliona",
    "osam miliona",
    "devet miliona",
  ];

  if (broj === 0) {
    return "nula";
  }

  let tekst = "";

  let celobrojniDeo = Math.floor(broj);
  const decimalniDeo = broj - celobrojniDeo;

  if (celobrojniDeo >= 1000000) {
    const milion = Math.floor(celobrojniDeo / 1000000);
    tekst += `${milioni[milion]} `;
    celobrojniDeo %= 1000000;
  }

  if (celobrojniDeo >= 1000) {
    const hiljada = Math.floor(celobrojniDeo / 1000);
    tekst += `${hiljade[hiljada]} `;
    celobrojniDeo %= 1000;
  }

  if (celobrojniDeo >= 100) {
    const sto = Math.floor(celobrojniDeo / 100);
    tekst += `${stotine[sto]} `;
    celobrojniDeo %= 100;
  }

  if (celobrojniDeo >= 20) {
    const desetica = Math.floor(celobrojniDeo / 10);
    tekst += `${desetice[desetica]} `;
    celobrojniDeo %= 10;
  }

  if (celobrojniDeo >= 11 && celobrojniDeo <= 19) {
    tekst += specijalniBrojevi[celobrojniDeo];
  } else if (celobrojniDeo >= 1 && celobrojniDeo <= 9) {
    tekst += jedinice[celobrojniDeo];
  }

  if (decimalniDeo > 0) {
    const decimalniText = decimalniDeo.toFixed(2).split(".")[1];
    tekst += ` , ${brojUReciSrpski(decimalniText)}`;
  }

  return tekst.trim();
};

const AdditionalInformationComponent = ({
  totalValue,
  currentCompany,
  currentPartner,
  setAdditionalInformationProps,
}) => {
  const [uplacenoAvansno, setUplacenoAvansno] = useState(0);

  const notePlaceholder =
    "Rok za primedbu 5 dana. Prilikom uplate upisati broj računa u poziv na broj odobrenja u nalogu za prenos:\nDokument je kreiran elektronskom obradom podataka i punovažan je bez pečata i potpisa.";

  const razlikaZaUplatu = totalValue - uplacenoAvansno;
  const razlikaZaUplatuText = brojUReciSrpski(razlikaZaUplatu);

  useEffect(() => {
    setAdditionalInformationProps((prevState) => ({
      ...prevState,
      paymentTotal: razlikaZaUplatu.toFixed(2),
    }));
  }, [totalValue, uplacenoAvansno]);

  const handleUplacenoAvansnoChange = (e) => {
    const value = e.target.value;
    setUplacenoAvansno(parseFloat(value));
    setAdditionalInformationProps((prevState) => ({
      ...prevState,
      uplacenoAvansno: parseFloat(value),
    }));
  };
  const handleNoteChange = (e) => {
    setAdditionalInformationProps((prevState) => ({
      ...prevState,
      note: e.target.value,
    }));
  };
  return (
    <Row>
      <Col xs={6} md={3}>
        <div className={styles["side-by-side"]}>
          <div className={styles["form-container-top"]}>
            <Form layout="vertical">
              {/* Racun broj */}
              <div className={styles["form-row"]}>
                <div className={styles["form-label"]}>Usluge izvrsio:</div>
                <div className={styles["form-input"]}>
                  <Input value={currentCompany.director} disabled />
                </div>
              </div>
              {/* Rok placanja */}
              <div className={styles["form-row"]}>
                <div className={styles["form-label"]}>Usluge primio:</div>
                <div className={styles["form-input"]}>
                  <Input value={currentPartner.director} disabled />
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Col>
      <Col xs={6} md={3}>
        <div className={styles["side-by-side"]}>
          <div
            className={styles["form-container"]}
            style={{ display: "block" }}
          >
            <Form>
              <div className={styles["form-row"]}>
                <div className={styles["form-label"]}>Ukupna vrednost:</div>
                <div className={styles["form-input"]}>
                  <Input value={totalValue} addonAfter="RSD" />
                </div>
              </div>
              <div className={styles["form-row"]}>
                <div className={styles["form-label"]}>Uplaceno avansno:</div>
                <div
                  className={`${styles["form-input"]} ${styles["fixed-width"]}`}
                >
                  <Input
                    value={uplacenoAvansno}
                    onChange={handleUplacenoAvansnoChange}
                    placeholder="00.00"
                    addonAfter="RSD"
                  />
                </div>
              </div>
              <div className={styles["form-row"]}>
                <div className={styles["form-label"]}>Razlika za uplatu:</div>
                <div className={styles["form-input"]}>
                  <Input value={razlikaZaUplatu.toFixed(2)} addonAfter="RSD" />
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Col>
      <Col xs={12} md={6}>
        <div className={styles["form-container"]} style={{ display: "block" }}>
          <Form>
            <div className={styles["form-row"]} style={{ width: "100%" }}>
              <div className={styles["form-label"]}>Napomena:</div>
              <div className={`${styles["form-input"]} ${styles["flex-grow"]}`}>
                <TextArea
                  onChange={handleNoteChange}
                  placeholder={notePlaceholder}
                  rows={4}
                  style={{ width: "80%" }}
                />
              </div>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};
export default AdditionalInformationComponent;
