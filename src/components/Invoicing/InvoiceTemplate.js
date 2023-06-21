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

    console.log(invoiceData);

    return (
      <div>
        <Modal
          show={this.props.isModalOpen}
          onHide={this.props.onCancel}
          size="lg"
          centered
        >
          <div id="invoiceCapture">
            <div className="container">
              <div className="row">
                <div className="col-md-5" style={{ marginTop: "20px" }}>
                  <div
                    className="d-flex align-items-center"
                    style={{ maxWidth: "100%" }}
                  >
                    <img
                      src={company.logo}
                      alt="Company Logo"
                      style={{ maxWidth: "100%" }}
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="col-md-7" style={{ marginTop: "15px" }}>
                  <h4 className="fw-bold my-2" style={{ fontSize: "15px" }}>
                    {company.director}, {company.name},{" "}
                    {company.city.toUpperCase()}
                  </h4>
                  <p className="fw-bold mb-1" style={{ fontSize: "15px" }}>
                    {company.city}, {company.address}
                  </p>
                  <p
                    className="text-secondary fw-bold"
                    style={{ marginBottom: "-2px", fontSize: "12px" }}
                  >
                    PIB: {company.pib} MB: {company.mb}
                  </p>
                  <p
                    className="text-secondary fw-bold mb-1"
                    style={{ fontSize: "12px" }}
                  >
                    Tekuci racun: {company.tekuci_racun}
                  </p>
                  <div>
                    <p
                      className="text-secondary fw-bold mb-1"
                      style={{ fontSize: "12px" }}
                    >
                      Telefon: {company.phone} E-mail: {company.email}
                    </p>
                  </div>
                </div>
                <span style={{ fontSize: "10px" }} className="text-center">
                  *izdavalac računa nije obveznik PDV-a
                </span>
                <hr />
                <span
                  style={{
                    fontSize: "12px",
                    display: "inline-block",
                    marginTop: "-15px",
                  }}
                  className="text-center text-secondary fw-bold"
                >
                  Šifra delatnosti: {company.sifra_delatnosti}
                </span>
              </div>
            </div>

            <div className="p-4">
              <Row className="mb-4">
                <Col
                  md={5}
                  style={{
                    fontSize: "12px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      marginBottom: "5px",
                      display: "flex",
                    }}
                  >
                    <label style={{ marginRight: "5px", minWidth: "150px" }}>
                      Broj racuna:
                    </label>
                    <span style={{ fontWeight: "bold" }}>
                      {invoiceData.racunBroj}
                    </span>
                  </div>

                  <div style={{ marginBottom: "5px", display: "flex" }}>
                    <label style={{ marginRight: "5px", minWidth: "150px" }}>
                      Rok placanja:
                    </label>
                    <span style={{ fontWeight: "bold" }}>
                      {invoiceData.rokPlacanja}
                    </span>
                  </div>

                  <div style={{ marginBottom: "5px", display: "flex" }}>
                    <label style={{ marginRight: "5px", minWidth: "150px" }}>
                      Nacin placanja:
                    </label>
                    <span style={{ fontWeight: "bold" }}>
                      {invoiceData.nacinPlacanja}
                    </span>
                  </div>

                  <div style={{ marginBottom: "5px", display: "flex" }}>
                    <label style={{ marginRight: "5px", minWidth: "200px" }}>
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

                  <div style={{ marginBottom: "5px", display: "flex" }}>
                    <label style={{ marginRight: "5px", minWidth: "200px" }}>
                      Datum prometa dobara i usluga:
                    </label>
                    <span style={{ fontWeight: "bold" }}>
                      {invoiceData.datumPromenta
                        ? new Date(
                            invoiceData.datumPromenta
                          ).toLocaleDateString("en-GB")
                        : ""}
                    </span>
                  </div>

                  <div
                    style={{
                      marginBottom: "5px",
                      display: "flex",
                    }}
                  >
                    <label style={{ marginRight: "5px", minWidth: "200px" }}>
                      Mesto prometa dobara i usluga:
                    </label>
                    {invoiceData.mestoPrometaRacuna ? (
                      <span style={{ fontWeight: "bold" }}>
                        {invoiceData.mestoPrometaRacuna}
                      </span>
                    ) : (
                      <span style={{ fontWeight: "bold" }}>{company.city}</span>
                    )}
                  </div>

                  <div style={{ marginBottom: "5px", display: "flex" }}>
                    <label style={{ marginRight: "5px", minWidth: "200px" }}>
                      Mesto izdavanja racuna:
                    </label>
                    {invoiceData.mestoIzdavanjaRacuna ? (
                      <span style={{ fontWeight: "bold" }}>
                        {invoiceData.mestoIzdavanjaRacuna}
                      </span>
                    ) : (
                      <span style={{ fontWeight: "bold" }}>{company.city}</span>
                    )}
                  </div>
                </Col>
                <Col md={7} style={{ fontSize: "12px" }}>
                  <fieldset
                    style={{ marginTop: "-20px", padding: "3px" }}
                    className="border rounded-3 table-responsive"
                  >
                    <legend
                      style={{ fontSize: "12px" }}
                      className="float-none w-auto px-3"
                    >
                      Kupac-Klijent
                    </legend>
                    <div
                      style={{ fontSize: "12px", width: "100%" }}
                      className="table-responsive"
                    >
                      <Table className={"table table-sm w-100 h-100"}>
                        <tbody>
                          <tr>
                            <div className="fw-bold">{partner.name || ""}</div>
                            <div className="fw-bold">
                              {partner.address || ""}
                            </div>
                            <div className="fw-bold">{partner.city || ""}</div>
                          </tr>
                          <tr>
                            <div>
                              PIB:&nbsp;
                              <span className="fw-bold">
                                {partner.pib || ""}
                              </span>
                            </div>
                          </tr>
                          <tr>
                            <td style={{ border: "none" }}>
                              <div>
                                MB:&nbsp;
                                <span className="fw-bold">
                                  {partner.mb || ""}
                                </span>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <div>
                              E-mail:&nbsp;
                              <span className="fw-bold">
                                {partner.email || ""}
                              </span>
                            </div>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </fieldset>
                </Col>
              </Row>
              <hr style={{ marginTop: "-15px" }} />
              <Table className="mb-0" style={{ marginTop: "-10px" }}>
                <thead style={{ fontSize: "12px" }}>
                  <tr>
                    <th>r.Br.</th>
                    <th>Naziv</th>
                    <th>Kol.</th>
                    <th className="text-end">Cena(RSD)</th>
                    <th className="text-end">Vrednost(RSD)</th>
                    <th className="text-end">PDV(%)</th>
                    <th className="text-end">Ukupno(RSD)</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: "12px" }}>
                  {tableInformation.map((item, i) => {
                    return (
                      <tr id={i} key={i}>
                        <td>{i + 1}</td>
                        <td>{item.nazivUsluge}</td>
                        <td style={{ width: "70px" }}>{item.kolicina}</td>
                        <td className="text-end" style={{ width: "100px" }}>
                          {item.cena}
                        </td>
                        <td className="text-end" style={{ width: "100px" }}>
                          {item.vrednost}
                        </td>
                        <td className="text-end" style={{ width: "100px" }}>
                          {item.porez || 0}
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
                <div style={{ marginTop: "50px" }}>
                  <fieldset
                    style={{ paddingTop: "-20px", marginBottom: "5px" }}
                  >
                    <legend
                      style={{
                        fontSize: "10px",
                      }}
                    >
                      Usluge izvrsio:
                    </legend>
                    <div
                      style={{
                        display: "inline-block",
                        verticalAlign: "bottom",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                    >
                      <div style={{ borderBottom: "1px solid black" }}>
                        <span>{company.director}</span>
                      </div>
                      <div style={{ fontSize: "10px" }}>
                        Ime, prezime, potpis
                      </div>
                    </div>
                    <span style={{ fontSize: "10px" }}>
                      &nbsp;&nbsp;&nbsp;M.P. &nbsp;&nbsp;&nbsp;
                    </span>
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
                        <img
                          src={company.potpis}
                          className="img-fluid"
                          alt="Potpis"
                          style={{ width: "100px", height: "40px" }}
                        />
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
                    <div
                      style={{
                        display: "inline-block",
                        verticalAlign: "bottom",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                    >
                      <div style={{ borderBottom: "1px solid black" }}>
                        <span>{partner.director}</span>
                      </div>
                      <div style={{ fontSize: "10px" }}>Primio</div>
                    </div>
                    <span style={{ fontSize: "10px" }}>
                      &nbsp;&nbsp;&nbsp;M.P. &nbsp;&nbsp;&nbsp;
                    </span>
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
                  <tbody style={{ fontSize: "12px" }}>
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
                        <td className="text-end" style={{ width: "120px" }}>
                          {this.props.currency} {this.props.taxAmount || 0} %
                        </td>
                      </tr>
                    )}
                    {additionalInformationProps.uplacenoAvansno !== "" && (
                      <tr className="text-end">
                        <td></td>
                        <td className="fw-bold" style={{ width: "100px" }}>
                          Avansno:
                        </td>
                        <td className="text-end" style={{ width: "120px" }}>
                          {additionalInformationProps.uplacenoAvansno.toFixed(2)} RSD
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
                      <td className="text-end" style={{ width: "120px" }}>
                        {additionalInformationProps.paymentTotal} RSD
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              {additionalInformationProps.note && (
                <div
                  className="bg-light py-3 px-4 rounded"
                  style={{ fontSize: "12px" }}
                >
                  {additionalInformationProps.note}
                </div>
              )}
            </div>
          </div>
          <div className="pb-4 px-4">
            <Row>
              <Col md={6}>
                {/* <Button
                  variant="primary"
                  className="d-block w-100"
                  onClick={GenerateInvoice}
                >
                  <BiPaperPlane
                    style={{ width: "15px", height: "15px", marginTop: "-3px" }}
                    className="me-2"
                  />
                  Send Invoice
                </Button> */}
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
