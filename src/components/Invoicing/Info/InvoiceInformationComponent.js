import React from "react";
import { DatePicker, Input, Form } from "antd";
import "../../../Styles/InvoiceInformationComponent.css";

const InvoiceInformationComponent = () => {
  return (
    <div className="container">
      <div className="racun-information-container">
        <Form layout="vertical">
          {/* Racun broj */}
          <div className="form-row">
            <div className="form-label">Racun broj:</div>
            <div className="form-input">
              <Input />
            </div>
          </div>

          {/* Rok placanja */}
          <div className="form-row">
            <div className="form-label">Rok placanja:</div>
            <div className="form-input">
              <Input />
            </div>
          </div>

          {/* Nacin placanja */}
          <div className="form-row">
            <div className="form-label">Nacin placanja:</div>
            <div className="form-input">
              <Input />
            </div>
          </div>
        </Form>
      </div>

      <div className="racun-date-information-container">
        <div className="date-row">
          <div className="date-label">Datum izdavanja racuna:</div>
          <div className="date-input">
            <DatePicker format="DD/MM/YYYY" />
          </div>
        </div>

        <div className="date-row">
          <div className="date-label">Mesto izdavanja racuna:</div>
          <div className="date-input">
            <Input />
          </div>
        </div>

        <div className="date-row">
          <div className="date-label">Datum prometa dobara i usluga:</div>
          <div className="date-input">
            <DatePicker format="DD/MM/YYY" />
          </div>
        </div>

        <div className="date-row">
          <div className="date-label">Mesto prometa racuna:</div>
          <div className="date-input">
            <Input />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceInformationComponent;
