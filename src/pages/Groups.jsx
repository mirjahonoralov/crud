import React, { useState } from "react";
import { Table, Divider, Modal } from "antd";
import GroupForm from "../components/GroupForm";
import uuid from "react-uuid";
import {
  columns,
  data,
  defaultModalValues,
} from "../components/GroupFormData.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Groups = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selected, setSelected] = useState([]);
  const [users, setUsers] = useState(data);
  const [clearForm, setClearForm] = useState(false);
  const [modalValues, setModalValues] = useState(defaultModalValues);

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => {
    setIsModalVisible(false);
    // console.log(form.getFieldValue());
  };
  const handleCancel = () => setIsModalVisible(false);

  const rowSelection = {
    onChange: (selectedKeys, selectedRows) => setSelected(selectedRows),
  };

  const getUser = (item) => {
    let isThere = false;
    users.map((user) => {
      if (user.email === item.email) isThere = true;
    });
    isThere && toast.error("same Email");
    isThere ? setUsers(users) : setUsers([...users, { ...item, key: uuid() }]);
  };

  const editUser = (oldValues, newValues) => {
    let sameElements = 0;
    for (let key in oldValues) {
      if (oldValues[key] === newValues[key]) sameElements++;
    }

    if (sameElements === 4) toast.error("not edited");
    else {
      let index = users.indexOf(oldValues);
      users.splice(index, 1, newValues);
      setUsers([...users]);
    }
  };

  const handleDelete = (deleteUsers) => {
    let currentUsers = users;
    deleteUsers.map((deleteUser) => {
      currentUsers = currentUsers.filter((user) => user.key !== deleteUser.key);
      setUsers(currentUsers);
    });
    setModalValues(defaultModalValues);
    setSelected([]);
  };

  const handleAdd = () => {
    setModalValues(defaultModalValues);
    showModal();
    setClearForm(true);
  };

  const handleEdit = (selected) => {
    showModal();
    setModalValues(...selected);
  };

  return (
    <div>
      <div className="p-2">
        <div className="actions d-flex gap-3">
          <button className="btn btn-success" onClick={() => handleAdd()}>
            Add
          </button>
          {selected.length === 1 && (
            <button
              className="btn btn-primary"
              onClick={() => handleEdit(selected)}
            >
              Edit
            </button>
          )}
          {selected.length !== 0 && (
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(selected)}
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <Divider />

      <div style={{ overflowY: "scroll", height: "60vh" }}>
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={users}
        />
      </div>

      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <GroupForm
          editUser={editUser}
          getUser={getUser}
          modalValues={modalValues}
          clearForm={clearForm}
        />
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Groups;
