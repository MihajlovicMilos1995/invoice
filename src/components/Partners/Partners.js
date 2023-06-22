import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import { SearchOutlined } from "@ant-design/icons";
import "../../Styles/Partners.css";

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const [form] = useForm();

  const filteredPartners = partners.filter((partner) =>
    partner.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = () => {
    axios
      .get("http://localhost:3000/partners")
      .then((response) => {
        setPartners(response.data);
      })
      .catch((error) => {
        console.error("Error fetching partners:", error);
      });
  };

  if (!partners || partners.length === 0) {
    return <div>Loading...</div>;
  }

  const columns = [
    {
      title: "Naziv",
      dataIndex: "name",
      key: "name",
      width: "10%",
      filterDropdown: () => (
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          prefix={<SearchOutlined />}
          placeholder="Pretraga"
        />
      ),
    },
    {
      title: "Direktor",
      dataIndex: "director",
      key: "director",
    },
    {
      title: "PIB",
      dataIndex: "pib",
      key: "pib",
    },
    {
      title: "MB",
      dataIndex: "mb",
      key: "mb",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Adresa",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Grad",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Sifra delatnosti",
      dataIndex: "sifra_delatnosti",
      key: "sifra_delatnosti",
    },
    {
      title: "Tekući račun",
      dataIndex: "tekuci_racun",
      key: "tekuci_racun",
    },
    {
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
    },
  ];

  //edit

  const handleEdit = (partner) => {
    setEditingPartner(partner);
    form.setFieldsValue(partner);
    setIsModalVisible(true);
  };

  //delete
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/partners/${id}`)
      .then(() => {
        message.success("Partner uspesno obrisan");

        fetchPartners();
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
  //add partner
  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingPartner) {
          axios
            .put(`http://localhost:3000/partners/${editingPartner.id}`, values)
            .then(() => {
              message.success("Partner uspesno izmenjen");

              fetchPartners();

              form.resetFields();
              setIsModalVisible(false);
              setEditingPartner(null);
            })
            .catch((error) => {
              console.error("Error updating partner:", error);
            });
        } else {
          // add ako se ne menja
          axios
            .post("http://localhost:3000/partners", values)
            .then((response) => {
              message.success("Partner uspesno dodat");

              fetchPartners();

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

  const body = { backgroundColor: "rgb(219, 61, 68)" };
  return (
    <div className="partnerContainer">
      <div style={{ margin: "5px" }}>
        <h1>Partneri</h1>
      </div>
      <div>
        <Button style={{ margin: "5px" }} onClick={handleAddition}>
          Dodaj partnera
        </Button>
        <Table
          className="tablePartners"
          scroll={{ x: 400 }}
          dataSource={filteredPartners}
          columns={columns}
        />
      </div>
      <Modal
        title={editingPartner ? "Uredi partnera" : "Dodaj partnera"}
        open={isModalVisible}
        className={body}
        onCancel={() => {
          form.resetFields();
          setIsModalVisible(false);
          setEditingPartner(null);
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
          <Form.Item label="MB" name="mb">
            <Input style={{ width: "300px" }} />
          </Form.Item>
          <Form.Item label="Sifra delatnosti" name="sifra_delatnosti">
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
          <Form.Item label="Grad" name="city">
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

export default Partners;
