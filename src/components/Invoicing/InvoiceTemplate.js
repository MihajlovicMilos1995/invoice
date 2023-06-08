const InvoiceTemplate = ({ invoicePDF }) => {
  return (
    <div className="invoice-template">
      {invoicePDF && (
        <embed
          src={URL.createObjectURL(invoicePDF)}
          type="application/pdf"
          width="100%"
          height="600px"
        />
      )}
      {!invoicePDF && <p>Loading PDF...</p>}
    </div>
  );
};

export default InvoiceTemplate;
