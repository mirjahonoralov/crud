import React, { useEffect, useState } from "react";
import { Table, Divider, Modal } from "antd";
import { deleteData, getData, postData, putData } from "../server/common.js";
import StudentsForm from "../components/students/StudentsForm.jsx";
import { columns } from "../components/students/StudentsData.js";

const Students = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [defaultValues, setDefaultValues] = useState({});
  const [selected, setSelected] = useState([]);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleOk = (values) => {
    setIsModalVisible(false);
    if (selected.length === 0) {
      postData("bootcamps", values).then((res) => getBootcamps());
      console.log("postData");
    } else {
      putData(`bootcamps/${selected[0].id}`, values).then((res) =>
        getBootcamps()
      );
      setSelected([]);
    }
  };

  const handleDelete = () => {
    selected.map((item) =>
      deleteData(`bootcamps/${item.id}`).then((res) => getBootcamps())
    );
  };

  const handleEdit = () => {
    setDefaultValues(selected[0]);
    showModal();
  };

  const getBootcamps = () =>
    getData("bootcamps").then((res) => setData(res.data.data));

  const rowSelection = {
    onChange: (_, selectedRows) => {
      setSelected(selectedRows);
    },
  };

  useEffect(() => getBootcamps(), []);

  return (
    <div>
      <div className="p-4">
        <div className="actions d-flex gap-3">
          <button className="btn btn-success" onClick={showModal}>
            Add
          </button>
          {selected.length === 1 && (
            <button className="btn btn-primary" onClick={handleEdit}>
              Edit
            </button>
          )}
          {selected.length !== 0 && (
            <button className="btn btn-danger" onClick={() => handleDelete()}>
              Delete
            </button>
          )}
        </div>
      </div>
      <Divider />
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
          selectedRowKeys: selected.map((item) => item.id),
        }}
        rowKey="id"
        columns={columns}
        dataSource={data}
      />

      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        // onOk={handleOk}
        onCancel={handleCancel}
      >
        <StudentsForm handleOk={handleOk} defaultValues={defaultValues} />
      </Modal>
    </div>
  );
};

export default Students;
