import { Divider, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import uuid from "react-uuid";
import CoursesForm from "../components/CoursesForm";
import { columns, defaultModalValues } from "../components/CoursesFormData";
import axios from "axios";
import { API_URL } from "../const";

const Courses = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [modalValues, setModalValues] = useState(defaultModalValues);
  const [clearForm, setClearForm] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => {
    setIsModalVisible(false);
    // console.log(form.getFieldValue());
  };
  const handleCancel = () => setIsModalVisible(false);
  const rowSelection = {
    onChange: (selectedKeys, selectedRows) => setSelected(selectedRows),
  };

  const handleDelete = (deleteUsers) => {
    let currentUsers = data;
    deleteUsers.map((deleteUser) => {
      currentUsers = currentUsers.filter((user) => user.key !== deleteUser.key);
      //   setUsers(currentUsers);
    });
    // setModalValues(defaultModalValues);
    setSelected([]);
  };

  const handleAdd = () => {
    setModalValues(defaultModalValues);
    showModal();
    // setClearForm(true);
  };

  const handleEdit = (selected) => {
    showModal();
    setModalValues(...selected);
  };

  const getUser = (item) => {
    console.log("selected", selected);
    console.log("item", item);
    let isThere = false;
    // users.map((user) => {
    //   if (user.email === item.email) isThere = true;
    // });
    // isThere && toast.error("same Email");
    // isThere ? setUsers(users) : setUsers([...users, { ...item, key: uuid() }]);
    if (selected.length === 0) {
      postCourse(item);
    } else {
      console.log("update");
      updateCourse(item);
    }
  };

  const editUser = (oldValues, newValues) => {
    let sameElements = 0;
    // for (let key in oldValues) {
    //   if (oldValues[key] === newValues[key]) sameElements++;
    // }

    // if (sameElements === 4) toast.error("not edited");
    // else {
    //   let index = users.indexOf(oldValues);
    //   users.splice(index, 1, newValues);
    //   setUsers([...users]);
    // }
  };

  const getAllData = () => {
    axios.get(API_URL + "courses").then((res) => {
      setData(res.data.data);
      console.log(res.data.data);
    });
  };

  useEffect(() => {
    axios.get(API_URL + "courses").then((res) => {
      setData(res.data.data);
      console.log(res.data.data);
    });
  }, []);

  const token = {
    headers: {
      Autorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2E1MTRiNWQyYzEyYzc0NDliZTA0MiIsImlhdCI6MTY0OTMzMDkxMiwiZXhwIjoxNjUxOTIyOTEyfQ.dcmqmgSfHM61U9vS894IAN5tMClZPxHbtyiSHY1noDI",
    },
  };

  const postCourse = (values) => {
    axios
      .post(API_URL + "/5d713995b721c3bb38c1f5d0/courses", values, token)
      .then((res) => {
        setData(res.data.data);
      })
      .then(getAllData());
  };

  const updateCourse = (values) => {
    console.log(values);
    axios
      .post(API_URL + "/courses/624ecaf3cca42900169220c2", values, token)
      .then((res) => {
        setData(res.data.data);
      })
      .then(getAllData());
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
          rowKey="_id"
          columns={columns}
          dataSource={data}
        />
      </div>

      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <CoursesForm
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

export default Courses;
