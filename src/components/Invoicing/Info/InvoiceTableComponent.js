import { Input, Button } from "antd";
import React, { useState, useEffect } from "react";
import "../../../Styles/InvoiceTableComponent.css";

const InvoiceTableComponent = ({ setTotalValue, setTableInformation }) => {
  const [data, setData] = useState([{ id: 0 }]);
  const [rowCount, setRowCount] = useState(1);
  const [nextRowId, setNextRowId] = useState(1);

  const addRow = () => {
    const newRow = {
      id: nextRowId,
      nazivUsluge: "",
      opisUsluge: "",
      kolicina: "",
      cena: "",
      vrednost: "",
      rabat: "",
      ukupno: "",
    };

    setData([...data, newRow]);
    setRowCount(rowCount + 1);
    setNextRowId(nextRowId + 1);
  };

  useEffect(() => {
    setTableInformation(data);
    setTotalValue(calculateTotal());
  }, [data, setTableInformation]);

  const deleteRow = (id) => {
    const updatedData = data.filter((row) => row.id !== id);
    setData(updatedData);
    setRowCount(rowCount - 1);

    const reindexedData = updatedData.map((row, index) => {
      return { ...row, id: index };
    });
    setData(reindexedData);
  };

  const handleInputChange = (value, id, fieldName) => {
    const updatedData = data.map((row) => {
      if (row.id === id) {
        const updatedRow = { ...row, [fieldName]: value };
        if (
          fieldName === "kolicina" ||
          fieldName === "cena" ||
          fieldName === "rabat"
        ) {
          const quantity = parseFloat(updatedRow.kolicina);
          const price = parseFloat(updatedRow.cena);
          const discount = parseFloat(updatedRow.rabat || 0);

          if (!isNaN(quantity) && !isNaN(price) && !isNaN(discount)) {
            const value = quantity * price;
            const discountedValue = value - (value * discount) / 100;
            updatedRow.ukupno = discountedValue.toFixed(2);
          } else {
            updatedRow.ukupno = "";
          }
        }
        return updatedRow;
      }
      return row;
    });

    setData(updatedData);
  };

  const renderTableRows = () => {
    return data.map((row, index) => (
      <tr key={row.id}>
        <td className="tRbHeader">{index + 1}</td>
        <td>
          <Input
            placeholder="Naziv usluge"
            className="nazivUsluge"
            onChange={(e) =>
              handleInputChange(e.target.value, row.id, "nazivUsluge")
            }
          />
        </td>
        <td>
          <Input
            className="kolicina"
            placeholder="Kol."
            onChange={(e) =>
              handleInputChange(e.target.value, row.id, "kolicina")
            }
          />
        </td>
        <td>
          <Input
            className="cena"
            placeholder="Cena"
            onChange={(e) => handleInputChange(e.target.value, row.id, "cena")}
          />
        </td>
        <td>
          <Input
            className="vrednost"
            placeholder="Vrednost"
            onChange={(e) =>
              handleInputChange(e.target.value, row.id, "vrednost")
            }
          />
        </td>
        <td>
          <Input
            className="rabat"
            onChange={(e) => handleInputChange(e.target.value, row.id, "rabat")}
          />
        </td>
        <td>
          <Input
            placeholder="Ukupno"
            className="ukupno"
            value={row.ukupno}
            onChange={(e) =>
              handleInputChange(e.target.value, row.id, "ukupno")
            }
          />
        </td>
        <td>
          <Button
            onClick={() => deleteRow(row.id)}
            className="akcija"
            disabled={data.length === 1}
          >
            Obrisi
          </Button>
        </td>
      </tr>
    ));
  };

  const calculateTotal = () => {
    let total = 0;

    data.forEach((row) => {
      const ukupno = parseFloat(row.ukupno);
      if (!isNaN(ukupno)) {
        total += ukupno;
      }
    });

    return total.toFixed(2);
  };

  return (
    <div className="outer-container">
      <table className="table table-bordered  table-responsive">
        <thead style={{ fontSize: "13px", fontWeight: "lighter" }}>
          <tr>
            <th className="tRbHeader">r.Br</th>
            <th className="tNazivHeader">Naziv usluga</th>
            <th className="tKolicinaHeader">Obim usluga(kol.)</th>
            <th className="tCenaHeader">Cena</th>
            <th className="tVrednostHeader">Vrednost</th>
            <th className="tRabatHeader">Rabat</th>
            <th className="tUkupnoHeader">Ukupno</th>
            <th className="tAkcijaHeader">Akcija</th>
          </tr>
          <tr>
            <th className="tRbHeader">-</th>
            <th className="tNazivHeader">-</th>
            <th className="tKolicinaHeader">-</th>
            <th className="tCenaHeader">RSD</th>
            <th className="tVrednostHeader">RSD</th>
            <th className="tRabatHeader">%</th>
            <th className="tUkupnoHeader">RSD</th>
            <th className="tAkcijaHeader"></th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
      <div style={{ marginTop: "10px" }}>
        <Button onClick={addRow}>Dodaj stavku</Button>
      </div>
    </div>
  );
};

export default InvoiceTableComponent;
