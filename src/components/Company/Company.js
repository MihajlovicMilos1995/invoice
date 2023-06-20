import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message, Upload } from "antd";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import { UploadOutlined } from "@ant-design/icons";
import "../../Styles/Company.css";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [logoBase64, setLogoBase64] = useState(null);

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

  const handleEdit = (partner) => {
    setEditingCompany(partner);
    form.setFieldsValue(partner);
    setIsModalVisible(true);
  };

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

  const handleAddition = () => {
    setIsModalVisible(true);
  };

  const handleLogoUpload = (info) => {
    const { fileList } = info;
    if (fileList && fileList.length > 0) {
      const uploadedFile = fileList[0].originFileObj;
      setLogoBase64(uploadedFile);
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result;
        const updatedFileList = fileList.map((file) => {
          if (file.uid === uploadedFile.uid) {
            return {
              ...file,
              originFileObj: base64Data,
            };
          }
          return file;
        });
        form.setFieldsValue({
          logo: {
            fileList: updatedFileList,
            file: {
              uid: uploadedFile.uid,
            },
          },
        });
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingCompany) {
          const updatedValues = { ...editingCompany, ...values };
          if (
            values.logo &&
            values.logo.fileList &&
            values.logo.fileList.length > 0
          ) {
            const file = values.logo.fileList[0].originFileObj;
            const reader = new FileReader();
            reader.onload = () => {
              const base64Data = reader.result;
              updatedValues.logo = base64Data;
              sendFormData(updatedValues);
            };
            reader.readAsDataURL(file);
          } else {
            sendFormData(updatedValues);
          }
        } else {
          if (
            values.logo &&
            values.logo.fileList &&
            values.logo.fileList.length > 0
          ) {
            const file = values.logo.fileList[0].originFileObj;
            const reader = new FileReader();
            reader.onload = () => {
              const base64Data = reader.result;
              values.logo = base64Data;
              sendFormData(values);
            };
            reader.readAsDataURL(file);
          } else {
            sendFormData(values);
          }
        }
      })
      .catch((error) => {
        console.error("Form validation error:", error);
      });
  };

  const sendFormData = (formData) => {
    if (editingCompany) {
      axios
        .put(`http://localhost:3000/companies/${editingCompany.id}`, formData)
        .then(() => {
          message.success("Firma uspešno izmenjena");
          fetchCompanies();
          form.resetFields();
          setIsModalVisible(false);
          setEditingCompany(null);
        })
        .catch((error) => {
          console.error("Error updating company:", error);
        });
    } else {
      axios
        .post("http://localhost:3000/companies", formData)
        .then(() => {
          message.success("Partner uspešno dodat");
          fetchCompanies();
          form.resetFields();
          setIsModalVisible(false);
        })
        .catch((error) => {
          console.error("Error adding partner:", error);
        });
    }
  };

  return (
    <div className="companyContainer">
      <div style={{ margin: "5px" }}>
        <h1>Firme</h1>
      </div>
      <div>
        <Button style={{ margin: "5px" }} onClick={handleAddition}>
          Dodaj firmu
        </Button>
        <Table
          scroll={{ x: 400 }}
          className="tableCompany"
          dataSource={companies}
          columns={columns}
        />
      </div>
      <Modal
        title={editingCompany ? "Uredi firmu" : "Dodaj firmu"}
        open={isModalVisible}
        onCancel={() => {
          form.resetFields();
          setIsModalVisible(false);
          setEditingCompany(null);
          setLogoBase64(null);
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
          <Form.Item label="MB" name="mb">
            <Input style={{ width: "300px" }} />
          </Form.Item>
          <Form.Item label="Tekući račun" name="tekuci_racun">
            <Input style={{ width: "300px" }} />
          </Form.Item>
          <Form.Item label="Logo" name="logo">
            <Upload
              beforeUpload={() => false}
              onChange={(info) => handleLogoUpload(info.file)}
              accept=".png,.jpg,.jpeg"
            >
              <Button style={{ width: "300px" }} icon={<UploadOutlined />}>
                Klikni da odaberes
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Companies;
