import { Input, Button } from "antd";
import React, { useState } from "react";

const InvoiceTableComponent = ({ setTotalValue }) => {
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
        <td>{index + 1}</td>
        <td>
          <Input
            placeholder="Naziv usluge"
            onChange={(e) =>
              handleInputChange(e.target.value, row.id, "nazivUsluge")
            }
          />
        </td>
        <td>
          <Input
            style={{ width: "100px" }}
            placeholder="Kolicina"
            onChange={(e) =>
              handleInputChange(e.target.value, row.id, "kolicina")
            }
          />
        </td>
        <td>
          <Input
            style={{ width: "100px" }}
            placeholder="Cena"
            onChange={(e) => handleInputChange(e.target.value, row.id, "cena")}
          />
        </td>
        <td>
          <Input
            style={{ width: "100px" }}
            placeholder="Vrednost"
            onChange={(e) =>
              handleInputChange(e.target.value, row.id, "vrednost")
            }
          />
        </td>
        <td>
          <Input
            style={{ width: "50px" }}
            onChange={(e) => handleInputChange(e.target.value, row.id, "rabat")}
          />
        </td>
        <td>
          <Input
            placeholder="Ukupno"
            value={row.ukupno}
            onChange={(e) =>
              handleInputChange(e.target.value, row.id, "ukupno")
            }
          />
        </td>
        <td>
          <Button
            onClick={() => deleteRow(row.id)}
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

  setTotalValue(calculateTotal());

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>r.Br</th>
            <th>Naziv usluga</th>
            <th>Obim usluga(kol.)</th>
            <th>Cena</th>
            <th>Vrednost</th>
            <th>Rabat</th>
            <th>Ukupno</th>
            <th>Akcija</th>
          </tr>
          <tr>
            <th>-</th>
            <th>-</th>
            <th>-</th>
            <th>RSD</th>
            <th>RSD</th>
            <th>%</th>
            <th>RSD</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
      <Button style={{ marginTop: "10px" }} onClick={addRow}>
        Dodaj stavku
      </Button>
    </div>
  );
};

export default InvoiceTableComponent;
