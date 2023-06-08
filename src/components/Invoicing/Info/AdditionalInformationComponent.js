import React, { useState } from "react";
import { Input, Form } from "antd";
import styles from "../../../Styles/AdditionalInformation.module.css";

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
    tekst += ` zarez ${brojUReciSrpski(decimalniText)}`;
  }

  return tekst.trim();
};
const AdditionalInformationComponent = ({
  totalValue,
  currentCompany,
  currentPartner,
}) => {
  const [uplacenoAvansno, setUplacenoAvansno] = useState(0);

  const handleUplacenoAvansnoChange = (e) => {
    const value = e.target.value;
    setUplacenoAvansno(value);
  };

  const razlikaZaUplatu = totalValue - uplacenoAvansno;
  const razlikaZaUplatuText = brojUReciSrpski(razlikaZaUplatu);

  return (
    <div className={styles["side-by-side"]}>
      <div className={styles["form-container-top"]}>
        <Form layout="vertical">
          {/* Racun broj */}
          <div className={styles["form-row"]}>
            <div className={styles["form-label"]}>Usluge izvrsio:</div>
            <div className={styles["form-input"]}>
              <Input value={currentCompany.name} disabled />
            </div>
          </div>

          {/* Rok placanja */}
          <div className={styles["form-row"]}>
            <div className={styles["form-label"]}>Usluge primio:</div>
            <div className={styles["form-input"]}>
              <Input value={currentPartner.name} disabled />
            </div>
          </div>
        </Form>
      </div>

      <div className={styles["form-container"]}>
        <Form>
          <div className={styles["form-row"]}>
            <div className={styles["form-label"]}>Ukupna vrednost:</div>
            <div className={styles["form-input"]}>
              <Input value={totalValue} addonAfter="RSD" />
            </div>
          </div>
          <div className={styles["form-row"]}>
            <div className={styles["form-label"]}>Uplaceno avansno:</div>
            <div className={`${styles["form-input"]} ${styles["fixed-width"]}`}>
              <Input
                value={uplacenoAvansno}
                onChange={handleUplacenoAvansnoChange}
                addonAfter="RSD"
              />
            </div>
          </div>
          <div className={styles["form-row"]}>
            <div className={styles["form-label"]}>Razlika za uplatu:</div>
            <div className={styles["form-input"]}>
              <Input value={razlikaZaUplatuText} addonAfter="RSD" />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default AdditionalInformationComponent;
