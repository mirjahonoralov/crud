import { Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CoursesForm from "../components/courses/CoursesForm";
import { columns } from "../components/courses/CoursesFormData";
import Loading from "../components/loading";
import PagesTop from "../components/pages-top/PagesTop";
import {
  deleteData,
  getData,
  postData,
  updateData,
} from "../server/crud-operations";

const Courses = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [modalValues, setModalValues] = useState();
  const [clearForm, setClearForm] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const handleCancel = () => setIsModalVisible(false);
  const rowSelection = {
    onChange: (_, selectedRows) => setSelected(selectedRows),
  };

  const [dataLoading, startDataLoading, stopDataLoading] = Loading();
  const [sendLoading, startSendLoading, stopSendLoading] = Loading();

  const lan = useSelector((state) => state.languageReducer);

  const handleDelete = () => {
    selected.map((course) =>
      deleteData(`courses/${course._id}`).then((res) => getAllData())
    );
    setSelected([]);
  };

  const handleAdd = () => {
    showModal();
    setClearForm(true);
  };

  const handleEdit = () => {
    showModal();
    setModalValues(selected[0]);
  };

  const getUser = (item) => {
    startSendLoading();
    if (selected.length === 0) {
      postData("bootcamps/62544344acb6e30016507b25/courses", item).then(
        (res) => {
          getAllData();
          stopSendLoading();
        }
      );
    } else {
      startSendLoading();
      updateData(`courses/62544344acb6e30016507b25`, item).then((res) => {
        getAllData();
        stopSendLoading();
      });
    }
  };

  const getAllData = () => {
    startDataLoading();
    getData("courses").then((res) => {
      setData(res.data.data);
      stopDataLoading();
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getAllData(), []);

  return (
    <div>
      <PagesTop
        selected={selected}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        title={lan.courses}
      />

      <div style={{ overflowY: "scroll", height: "58vh" }}>
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          rowKey="_id"
          columns={columns}
          dataSource={data}
          loading={dataLoading}
        />
      </div>

      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <CoursesForm
          getUser={getUser}
          modalValues={modalValues}
          clearForm={clearForm}
          sendLoading={sendLoading}
        />
      </Modal>
    </div>
  );
};

export default Courses;
