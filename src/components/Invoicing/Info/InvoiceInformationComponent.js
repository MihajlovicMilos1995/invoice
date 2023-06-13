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
      <div className="racun-information-container">
        <Form layout="vertical">
          {/* Racun broj */}
          <div className="form-row">
            <div className="form-label">Racun broj:</div>
            <div className="form-input">
              <Input
                onChange={(e) => handleInputChange("racunBroj", e.target.value)}
              />
            </div>
          </div>

          {/* Rok placanja */}
          <div className="form-row">
            <div className="form-label">Rok placanja:</div>
            <div className="form-input">
              <Input
                onChange={(e) =>
                  handleInputChange("rokPlacanja", e.target.value)
                }
              />
            </div>
          </div>

          {/* Nacin placanja */}
          <div className="form-row">
            <div className="form-label">Nacin placanja:</div>
            <div className="form-input">
              <Input
                onChange={(e) =>
                  handleInputChange("nacinPlacanja", e.target.value)
                }
              />
            </div>
          </div>
        </Form>
      </div>

      <div className="racun-date-information-container">
        <div className="date-row" style={{ marginTop: "5px" }}>
          <div className="date-label">Datum izdavanja racuna:</div>
          <div className="date-input">
            <DatePicker
              format="DD/MM/YYYY"
              placeholder="Izaberite datum"
              onChange={(date) =>
                handleInputChange("datumIzdavanjaRacuna", date)
              }
            />
          </div>
        </div>

        <div className="date-row" style={{ marginTop: "5px", width: "157px" }}>
          <div className="date-label">Mesto izdavanja racuna:</div>
          <div className="date-input">
            <Input value={currentCompany.city} />
          </div>
        </div>

        <div className="date-row" style={{ marginTop: "5px" }}>
          <div className="date-label">Datum prometa dobara i usluga:</div>
          <div className="date-input">
            <DatePicker
              format="DD/MM/YYYY"
              placeholder="Izaberite datum"
              onChange={(date) => handleInputChange("datumPromenta", date)}
            />
          </div>
        </div>

        <div className="date-row" style={{ marginTop: "5px", width: "157px" }}>
          <div className="date-label">Mesto prometa racuna:</div>
          <div className="date-input">
            <Input value={currentCompany.city} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceInformationComponent;
