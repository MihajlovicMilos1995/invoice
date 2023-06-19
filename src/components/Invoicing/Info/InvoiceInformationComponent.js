import React from "react";
import { DatePicker, Input, Form } from "antd";
import style from "../../../Styles/InvoiceInformationComponent.module.css";

const InvoiceInformationComponent = ({ setInvoiceData, currentCompany }) => {
  const handleInputChange = (name, value) => {
    setInvoiceData((prevData) => ({
      ...prevData,
      [name]: value,

      mestoIzdavanjaRacuna: currentCompany.city,
      mestoPrometaRacuna: currentCompany.city,
    }));
  };

  return (
    <div className={style.container}>
      <div className={style["racun-information-container"]}>
        <Form layout="vertical">
          <div className={style["form-row"]}>
            <div className={style["form-label"]}>Racun broj:</div>
            <div className={style["form-input"]}>
              <Input
                onChange={(e) => handleInputChange("racunBroj", e.target.value)}
              />
            </div>
          </div>

          <div className={style["form-row"]}>
            <div className={style["form-label"]}>Rok placanja:</div>
            <div className={style["form-input"]}>
              <Input
                onChange={(e) =>
                  handleInputChange("rokPlacanja", e.target.value)
                }
              />
            </div>
          </div>
          <div className={style["form-row"]}>
            <div className={style["form-label"]}>Nacin placanja:</div>
            <div className={style["form-input"]}>
              <Input
                onChange={(e) =>
                  handleInputChange("nacinPlacanja", e.target.value)
                }
              />
            </div>
          </div>
        </Form>
      </div>

      <div className={style["racun-date-information-container"]}>
        <Form>
          <div className={style["date-row"]} style={{ marginTop: "5px" }}>
            <div className={style["date-label"]}>Datum izdavanja racuna:</div>
            <div className={style["date-input"]}>
              <DatePicker
                format="DD/MM/YYYY"
                placeholder="Izaberite datum"
                onChange={(date) =>
                  handleInputChange("datumIzdavanjaRacuna", date)
                }
              />
            </div>
          </div>
          <div
            className={style["date-row"]}
            style={{ marginTop: "5px", width: "157px" }}
          >
            <div className={style["date-label"]}>Mesto izdavanja racuna:</div>
            <div className={style["date-input"]}>
              <Input value={currentCompany.city} />
            </div>
          </div>
          <div className={style["date-row"]} style={{ marginTop: "5px" }}>
            <div className={style["date-label"]}>
              Datum prometa dobara i usluga:
            </div>
            <div className={style["date-input"]}>
              <DatePicker
                format="DD/MM/YYYY"
                placeholder="Izaberite datum"
                onChange={(date) => handleInputChange("datumPromenta", date)}
              />
            </div>
          </div>

          <div
            className={style["date-row"]}
            style={{ marginTop: "5px", width: "157px" }}
          >
            <div className={style["date-label"]}>Mesto prometa racuna:</div>
            <div className={style["date-input"]}>
              <Input value={currentCompany.city} />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default InvoiceInformationComponent;
