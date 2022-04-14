import React, { useEffect, useState } from "react";
import { Table, Modal, message } from "antd";
import UsersForm from "../components/users/UsersForm";
import { columns } from "../components/users/UsersFormData.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteData,
  getData,
  postData,
  updateData,
} from "../server/crud-operations";
import PagesTop from "../components/pages-top/PagesTop";
import { useSelector } from "react-redux";
import Loading from "../components/loading";

const Groups = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selected, setSelected] = useState([]);
  const [users, setUsers] = useState([]);
  const [clearForm, setClearForm] = useState(false);
  const [modalValues, setModalValues] = useState({});
  const lan = useSelector((state) => state.languageReducer);

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const handleCancel = () => setIsModalVisible(false);

  const rowSelection = {
    onChange: (_, selectedRows) => setSelected(selectedRows),
  };
  const [submitLoading, startSubmitLoading, stopSubmitLoading] = Loading();
  const [dataLoading, startDataLoading, stopDataLoading] = Loading();

  const getUser = (item) => {
    if (selected.length === 0) {
      startSubmitLoading();
      postData("users", item)
        .then((res) => {
          stopSubmitLoading();
          renderUsers();
          handleCancel();
        })
        .catch((err) => {
          message.error("something wrong");
          stopSubmitLoading();
        });
    } else
      updateData(`users/${selected[0]._id}`, item)
        .then((res) => {
          renderUsers();
          handleCancel();
          setSelected([]);
        })
        .catch((err) => message.error(err));
  };

  const handleDelete = () =>
    selected.map((user) =>
      deleteData(`users/${user._id}`).then((res) => {
        renderUsers();
        setSelected([]);
      })
    );

  const handleAdd = () => {
    setSelected([]);
    setClearForm(true);
    showModal();
  };

  const handleEdit = () => {
    setClearForm(false);
    setModalValues(selected[0]);
    showModal();
  };

  const renderUsers = () => {
    startDataLoading();
    getData("users?page=1&limit=100").then((res) => {
      stopDataLoading();
      setUsers(res.data.data);
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => renderUsers(), []);

  return (
    <div>
      <PagesTop
        selected={selected}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        title={lan.bootcamps}
      />

      <div style={{ overflowY: "scroll", height: "58vh" }}>
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
            selectedRowKeys: selected.map((item) => item._id),
          }}
          columns={columns}
          dataSource={users}
          rowKey="_id"
          loading={dataLoading}
        />
      </div>

      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <UsersForm
          getUser={getUser}
          modalValues={modalValues}
          clearForm={clearForm}
          submitLoading={submitLoading}
        />
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Groups;
