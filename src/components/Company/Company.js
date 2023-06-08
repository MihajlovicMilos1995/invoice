import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import axios from "axios";
import { useForm } from "antd/es/form/Form";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  const [form] = useForm();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = () => {
    axios
      .get("http://localhost:3000/companies")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  };

  if (!companies || companies.length === 0) {
    return <div>Loading...</div>;
  }

  const actionCol = {
    title: "Akcije",
    dataIndex: "id",
    render: (id, record) => {
      return (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Izmeni
          </Button>
          <Button type="link" onClick={() => handleDelete(id)}>
            Obrisi
          </Button>
        </>
      );
    },
  };

  const columns = Object.keys(companies[0]).map((key) => ({
    title: key.toUpperCase(),
    dataIndex: key,
    key: key,
  }));

  columns.push(actionCol);

  //edit

  const handleEdit = (partner) => {
    setEditingCompany(partner);
    form.setFieldsValue(partner);
    setIsModalVisible(true);
  };

  //delete
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/companies/${id}`)
      .then(() => {
        message.success("Partner uspesno obrisan");

        fetchCompanies();
      })
      .catch((error) => {
        console.error("Error deleting partner:", error);
      });
  };
  //click
  const handleAddition = () => {
    setIsModalVisible(true);
  };
  //modal close
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };
  //add / edit
  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingCompany) {
          axios
            .put(`http://localhost:3000/companies/${editingCompany.id}`, values)
            .then(() => {
              message.success("Firma uspesno izmenjena");

              fetchCompanies();

              form.resetFields();
              setIsModalVisible(false);
              setEditingCompany(null);
            })
            .catch((error) => {
              console.error("Error updating company:", error);
            });
        } else {
          // add ako se ne menja
          axios
            .post("http://localhost:3000/companies", values)
            .then((response) => {
              message.success("Partner uspesno dodat");

              fetchCompanies();

              form.resetFields();
              setIsModalVisible(false);
            })
            .catch((error) => {
              console.error("Error adding partner:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Form validation error:", error);
      });
  };

  return (
    <div>
      <div>
        <h1>Firme</h1>
      </div>
      <div>
        <Button onClick={handleAddition}>Dodaj firmu</Button>
        <Table dataSource={companies} columns={columns} />
      </div>
      <Modal
        title={editingCompany ? "Uredi firmu" : "Dodaj firmu"}
        open={isModalVisible}
        onCancel={() => {
          form.resetFields();
          setIsModalVisible(false);
          setEditingCompany(null);
        }}
        onOk={handleModalOk}
      >
        <Form
          form={form}
          layout="vertical"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Form.Item label="Ime" name="name">
            <Input style={{ width: "300px" }} />
          </Form.Item>
          <Form.Item label="Direktor" name="director">
            <Input style={{ width: "300px" }} />
          </Form.Item>
          <Form.Item label="PIB" name="pib">
            <Input style={{ width: "300px" }} />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input style={{ width: "300px" }} />
          </Form.Item>
          <Form.Item label="Telefon" name="phone">
            <Input style={{ width: "300px" }} />
          </Form.Item>
          <Form.Item label="Adresa" name="address">
            <Input style={{ width: "300px" }} />
          </Form.Item>
          <Form.Item label="Grad" name="grad">
            <Input style={{ width: "300px" }} />
          </Form.Item>
          <Form.Item label="MB" name="mb">
            <Input style={{ width: "300px" }} />
          </Form.Item>
          <Form.Item label="Sifra delatnosti" name="sifra_delatnosti">
            <Input style={{ width: "300px" }} />
          </Form.Item>
          <Form.Item label="Tekući račun" name="tekuci_racun">
            <Input style={{ width: "300px" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Companies;
