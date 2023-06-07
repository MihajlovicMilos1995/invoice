import React, { useState, useEffect } from "react";
import { Input, Select } from "antd";
import "../../../Styles/PartnerInformationContainer.css";

const PartnerInformationComponent = ({ partners }) => {
  return (
    <div className="racun-information-container">
      <h3>Partner</h3>
      <div className="form-column">
        <div className="form-row">
          <div className="form-label">Ime:</div>
          <div className="form-input">
            <Input />
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">Adresa:</div>
          <div className="form-input">
            <Input />
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">Grad:</div>
          <div className="form-input">
            <Input />
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">Director:</div>
          <div className="form-input">
            <Input />
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">PIB:</div>
          <div className="form-input">
            <Input />
          </div>
        </div>
      </div>
      <div className="form-column">
        <div className="form-row">
          <div className="form-label">MB:</div>
          <div className="form-input">
            <Input />
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">Sifra delatnosti:</div>
          <div className="form-input">
            <Input />
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">Telefon:</div>
          <div className="form-input">
            <Input />
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">Email:</div>
          <div className="form-input">
            <Input />
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">Tekuci racun:</div>
          <div className="form-input">
            <Input />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerInformationComponent;
