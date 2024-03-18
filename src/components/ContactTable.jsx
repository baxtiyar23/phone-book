import React, { useState } from "react";
import { Table, Button, Popconfirm, message, Input } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";

const ContactTable = ({
  data,
  onEdit,
  onDelete,
  onAddToFavorites,
  onUpdateNote,
}) => {
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteInput, setNoteInput] = useState("");

  const handleNoteEdit = (id) => {
    setEditingNoteId(id);
  };

  const handleNoteSave = (id) => {
    onUpdateNote(id, noteInput);
    message.success("Note added successfully");
    setEditingNoteId(null);
    setNoteInput("");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      render: (text, record) =>
        editingNoteId === record.id ? (
          <>
            <Input
              defaultValue={text}
              onChange={(e) => setNoteInput(e.target.value)}
            />
            <Button  onClick={() => handleNoteSave(record.id)}>
              Save
            </Button>
          </>
        ) : (
          <span onClick={() => handleNoteEdit(record.id)}>
            {text || "Add Note"}
          </span>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this contact?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
          {record.isFavorite ? (
            <StarFilled
              style={{ color: "gold", marginLeft: "10px" }}
              onClick={() => onAddToFavorites(record.id)}
            />
          ) : (
            <StarOutlined
              style={{ marginLeft: "10px" }}
              onClick={() => onAddToFavorites(record.id)}
            />
          )}
        </span>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default ContactTable;
