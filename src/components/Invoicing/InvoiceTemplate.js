import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function GenerateInvoice() {
  html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: [612, 792],
    });
    pdf.internal.scaleFactor = 1;
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice-001.pdf");
  });
}

class InvoiceModal extends React.Component {
  render() {
    const { invoiceInformation } = this.props;
    const company = invoiceInformation.currentCompany;
    const partner = invoiceInformation.currentPartner;
    const additionalInformationProps =
      invoiceInformation.additionalInformationProps;
    const invoiceData = invoiceInformation.invoiceData;
    const tableInformation = invoiceInformation.tableInformation;
    const total = invoiceInformation.totalValue;

    return (
      <div>
        <Modal
          show={this.props.isModalOpen}
          onHide={this.props.onCancel}
          size="lg"
          centered
          destroyOnClose
        >
          <div id="invoiceCapture">
            <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
              <div className="w-100">
                <h4 className="fw-bold my-2">
                  {company.director},{company.name || "John Uberbacher"}
                </h4>
                <p className="fw-bold  mb-1">
                  {company.city}, {company.address}
                </p>
                <p className="text-secondary fw-bold">
                  PIB:{company.pib} MB:{company.mb}
                  <p className="text-secondary">
                    Tekuci racun:{company.tekuci_racun}
                    <p>
                      Telefon:{company.phone} E-mail:{company.email}{" "}
                    </p>
                  </p>
                </p>
              </div>
            </div>

            <div className="p-4">
              <Row className="mb-4">
                <Col md={4} style={{ fontSize: "13px" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ marginBottom: "5px" }}>
                      <label style={{ marginRight: "5px" }}>Broj racuna:</label>
                      <span style={{ fontWeight: "bold" }}>
                        {invoiceData.racunBroj}
                      </span>
                    </div>

                    <div style={{ marginBottom: "5px" }}>
                      <label style={{ marginRight: "5px" }}>
                        Rok placanja:
                      </label>
                      <span style={{ fontWeight: "bold" }}>
                        {invoiceData.rokPlacanja}
                      </span>
                    </div>
                    <div style={{ marginBottom: "5px" }}>
                      <label style={{ marginRight: "5px" }}>
                        Nacin placanja:
                      </label>
                      <span style={{ fontWeight: "bold" }}>
                        {invoiceData.nacinPlacanja}
                      </span>
                    </div>
                  </div>
                </Col>

                <Col md={4} style={{ fontSize: "13px" }}>
                  <div style={{ marginBottom: "5px" }}>
                    <label style={{ marginRight: "5px" }}>
                      Datum izdavanja racuna:
                    </label>
                    <span style={{ fontWeight: "bold" }}>
                      {invoiceData.datumIzdavanjaRacuna
                        ? new Date(
                            invoiceData.datumIzdavanjaRacuna
                          ).toLocaleDateString("en-GB")
                        : ""}
                    </span>
                  </div>
                  <div style={{ marginBottom: "5px" }}>
                    <label style={{ marginRight: "5px" }}>
                      Datum prometa dobara i usluga:
                    </label>
                    <span style={{ fontWeight: "bold" }}>
                      {invoiceData.datumIzdavanjaRacuna
                        ? new Date(
                            invoiceData.datumIzdavanjaRacuna
                          ).toLocaleDateString("en-GB")
                        : ""}
                    </span>
                    <div style={{ marginBottom: "5px" }}>
                      <label style={{ marginRight: "5px" }}>
                        Mesto prometa dobara i usluga:
                      </label>
                      <span style={{ fontWeight: "bold" }}>
                        {invoiceData.mestoPrometaRacuna}
                      </span>
                    </div>
                    <div style={{ marginBottom: "5px" }}>
                      <label style={{ marginRight: "5px" }}>
                        Mesto izdavanja racuna:
                      </label>
                      <span style={{ fontWeight: "bold" }}>
                        {invoiceData.mestoIzdavanjaRacuna}
                      </span>
                    </div>
                  </div>
                </Col>

                <Col md={4}>
                  <fieldset
                    style={{ marginTop: "-25px" }}
                    className="border rounded-3 p-1 table-responsive"
                  >
                    <legend
                      style={{ fontSize: "16px" }}
                      className="float-none w-auto px-3"
                    >
                      Kupac-Klijent
                    </legend>
                    <div
                      style={{ fontSize: "13px", width: "100%" }}
                      className="table-responsive"
                    >
                      <Table className={"table table-sm w-100 h-100"}>
                        <tbody>
                          <tr>
                            <div>{partner.name || ""}</div>
                            <div>{partner.address || ""}</div>
                          </tr>
                          <tr>
                            <div>PIB:&nbsp;{partner.pib || ""}</div>
                          </tr>
                          <tr>
                            <td style={{ border: "none" }}>
                              <div>TEL:&nbsp;{partner.phone || ""}</div>
                              <div>MB:&nbsp;{partner.mb || ""}</div>
                            </td>
                          </tr>
                          <tr>
                            <div>E-mail:&nbsp;{partner.email || ""}</div>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </fieldset>
                </Col>
              </Row>
              <hr />
              <Table className="mb-0">
                <thead>
                  <tr>
                    <th>Naziv</th>
                    <th>Kol.</th>
                    <th className="text-end">Cena(RSD)</th>
                    <th className="text-end">Vrednost(RSD)</th>
                    <th className="text-end">Rabat(%)</th>
                    <th className="text-end">Ukupno(RSD)</th>
                  </tr>
                </thead>
                <tbody>
                  {tableInformation.map((item, i) => {
                    return (
                      <tr id={i} key={i}>
                        <td>{item.nazivUsluge}</td>
                        <td style={{ width: "70px" }}>{item.kolicina}</td>
                        <td className="text-end" style={{ width: "100px" }}>
                          {item.cena}
                        </td>
                        <td className="text-end" style={{ width: "100px" }}>
                          {item.vrednost}
                        </td>
                        <td className="text-end" style={{ width: "100px" }}>
                          {item.rabat || 0}
                        </td>
                        <td className="text-end" style={{ width: "100px" }}>
                          {this.props.currency} {item.ukupno}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <div style={{ display: "flex" }}>
                <div style={{ marginTop: "68px" }}>
                  <fieldset style={{ paddingTop: "-20px" }}>
                    <legend
                      style={{
                        fontSize: "10px",
                      }}
                    >
                      Usluge izvrsio:
                    </legend>
                    <span style={{ borderBottom: "1px solid black" }}>
                      {company.director}
                    </span>
                    &nbsp;&nbsp;&nbsp;M.P. &nbsp;&nbsp;&nbsp;
                    <div
                      style={{
                        display: "inline-block",
                        verticalAlign: "bottom",
                        textAlign: "center",
                      }}
                      className="text-end"
                    >
                      <span
                        style={{
                          borderBottom: "1px solid black",
                          display: "block",
                          marginBottom: "-8px",
                        }}
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </span>
                      <span
                        style={{
                          fontSize: "10px",
                        }}
                      >
                        Potpis odgovornog lica
                      </span>
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend style={{ fontSize: "10px" }}>Usluge primio:</legend>
                    <span style={{ borderBottom: "1px solid black" }}>
                      {partner.director}
                    </span>
                    &nbsp;&nbsp;&nbsp;M.P. &nbsp;&nbsp;&nbsp;
                    <div
                      style={{
                        display: "inline-block",
                        verticalAlign: "bottom",
                        textAlign: "center",
                      }}
                    >
                      <span
                        style={{
                          borderBottom: "1px solid black",
                          display: "block",
                          marginBottom: "-8px",
                        }}
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </span>
                      <span
                        style={{
                          fontSize: "10px",
                        }}
                      >
                        Kontrolisao
                      </span>
                    </div>
                  </fieldset>
                </div>
                <Table style={{ flex: "1" }}>
                  <tbody>
                    <tr>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr className="text-end">
                      <td></td>
                      <td className="fw-bold" style={{ width: "100px" }}>
                        Ukupno:
                      </td>
                      <td className="text-end" style={{ width: "100px" }}>
                        {total} RSD
                      </td>
                    </tr>
                    {this.props.taxAmmount === 0.0 && (
                      <tr className="text-end">
                        <td>
                          <td></td>
                        </td>
                        <td className="fw-bold" style={{ width: "100px" }}>
                          Porez:
                        </td>
                        <td className="text-end" style={{ width: "100px" }}>
                          {this.props.currency} {this.props.taxAmount || 0} %
                        </td>
                      </tr>
                    )}
                    {this.uplacenoAvansno === 0.0 && (
                      <tr className="text-end">
                        <td></td>
                        <td className="fw-bold" style={{ width: "100px" }}>
                          Avansno:
                        </td>
                        <td className="text-end" style={{ width: "100px" }}>
                          {additionalInformationProps.uplacenoAvansno} RSD
                        </td>
                      </tr>
                    )}
                    <tr className="text-end">
                      <td>
                        <td></td>
                      </td>
                      <td className="fw-bold" style={{ width: "100px" }}>
                        Za uplatu:
                      </td>
                      <td className="text-end" style={{ width: "100px" }}>
                        {this.props.currency}
                        {additionalInformationProps.paymentTotal} RSD
                      </td>
                    </tr>
                  </tbody>
                </Table>
                {/* {this.props.info.notes && (
                <div className="bg-light py-3 px-4 rounded">
                  {this.props.info.notes}
                </div>
              )} */}
              </div>
            </div>
          </div>
          <div className="pb-4 px-4">
            <Row>
              <Col md={6}>
                <Button
                  variant="primary"
                  className="d-block w-100"
                  onClick={GenerateInvoice}
                >
                  <BiPaperPlane
                    style={{ width: "15px", height: "15px", marginTop: "-3px" }}
                    className="me-2"
                  />
                  Send Invoice
                </Button>
              </Col>
              <Col md={6}>
                <Button
                  variant="outline-primary"
                  className="d-block w-100 mt-3 mt-md-0"
                  onClick={GenerateInvoice}
                >
                  <BiCloudDownload
                    style={{ width: "16px", height: "16px", marginTop: "-3px" }}
                    className="me-2"
                  />
                  Download Copy
                </Button>
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
    );
  }
}

export default InvoiceModal;
