import React, { useState, useEffect } from "react";
import { Button, Card, Row, Col, message } from "antd";
import ContactFormModal from "./ContactFormModal";
import ContactTable from "./ContactTable";
import SearchFilters from "./SearchFilters";
import useLocalStorage from "./useLocalStorage";

const MainTable = () => {
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  const [visible, setVisible] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setEditingContact(null);
  };

  const handleCreate = (values) => {
    if (editingContact) {
      const updatedContacts = contacts.map((contact) =>
        contact.id === editingContact.id ? { ...contact, ...values } : contact
      );
      setContacts(updatedContacts);
      message.success("Contact updated successfully");
    } else {
      const newContact = {
        id: contacts.length + 1,
        createdAt: new Date().toLocaleDateString(),
        ...values,
      };
      setContacts([...contacts, newContact]);
      message.success("Contact added successfully");
    }
    setVisible(false);
    setEditingContact(null);
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setVisible(true);
  };

  const handleDelete = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
    message.success("Contact deleted successfully");
  };

  const handleAddToFavorites = (id) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === id
        ? { ...contact, isFavorite: !contact.isFavorite }
        : contact
    );
    setContacts(updatedContacts);
  };

  const handleUpdateNote = (id, note) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === id ? { ...contact, note: note } : contact
    );
    setContacts(updatedContacts);
    message.success("Note updated successfully");
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleFilter = (value) => {
    setFilter(value);
  };

  const filteredContacts = contacts
    .filter((contact) => {
      if (filter === "Favorites") {
        return contact.isFavorite;
      } else {
        return true;
      }
    })
    .filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <Button onClick={showModal} style={{ float: "right", margin: "20px" }}>
        Add Contact
      </Button>
      <SearchFilters onSearch={handleSearch} onFilter={handleFilter} />
      <ContactFormModal
        visible={visible}
        onCreate={handleCreate}
        onCancel={handleCancel}
        initialValues={editingContact}
      />
      <ContactTable
        data={filteredContacts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddToFavorites={handleAddToFavorites}
        onUpdateNote={handleUpdateNote}
      />
      <Row gutter={[16, 16]}>
        {contacts.map((contact) => (
          <Col span={6} key={contact.id}>
            <Card title={contact.name}>
              <p>ID: {contact.id}</p>
              <p>Number: {contact.number}</p>
              <p>Created At: {contact.createdAt}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MainTable;
