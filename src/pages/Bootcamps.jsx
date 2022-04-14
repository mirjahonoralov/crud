import React, { useEffect, useState } from "react";
import { Table, Modal } from "antd";
import { columns } from "../components/bootcamps/BootcampsData.js";
import {
  deleteData,
  getData,
  postData,
  updateData,
} from "../server/crud-operations.js";
import Loading from "../components/loading.jsx";
import { useSelector } from "react-redux";
import {
  ModalWrapper,
  TableWrapper,
} from "../components/bootcamps/Bootcamps.style.js";
import PagesTop from "../components/pages-top/PagesTop.jsx";
import BootcampsForm from "../components/bootcamps/BootcampsForm.jsx";

const Bootcamps = () => {
  const lan = useSelector((state) => state.languageReducer);
  const theme = useSelector((state) => state.themeReducer);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [modalValues, setModalValues] = useState({});
  const [selected, setSelected] = useState([]);
  const [clearForm, setClearForm] = useState(false);
  const [loading, startLoading, stopLoading] = Loading();
  const [sendLoading, sendStartLoading, sendStopLoading] = Loading();

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleOk = (values) => {
    setIsModalVisible(false);
    sendStartLoading();
    if (selected.length === 0) {
      postData("bootcamps", values).then((res) => {
        getBootcamps();
        sendStopLoading();
      });
    } else {
      updateData(`bootcamps/${selected[0].id}`, values).then((res) => {
        sendStopLoading();
        getBootcamps();
      });
      setSelected([]);
    }
  };

  const handleAdd = () => {
    setSelected([]);
    setClearForm(true);
    showModal();
  };

  const handleDelete = () => {
    selected.map((item) =>
      deleteData(`bootcamps/${item.id}`).then((res) => getBootcamps())
    );
    setSelected([]);
  };

  const handleEdit = () => {
    setClearForm(false);
    setModalValues(selected[0]);
    showModal();
  };

  const getBootcamps = () => {
    startLoading();
    getData("bootcamps").then((res) => {
      stopLoading();
      setData(res.data.data);
    });
  };

  const rowSelection = {
    onChange: (_, selectedRows) => {
      setSelected(selectedRows);
    },
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getBootcamps(), []);

  return (
    <div>
      <PagesTop
        selected={selected}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        title={lan.bootcamps}
      />

      <TableWrapper theme={theme}>
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
            selectedRowKeys: selected.map((item) => item.id),
          }}
          rowKey="id"
          columns={columns}
          dataSource={data}
          loading={loading}
          style={{ background: theme.bgColor }}
        />
      </TableWrapper>

      <ModalWrapper>
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          // onOk={handleOk}
          onCancel={handleCancel}
          theme={theme}
          style={{ background: theme.bgColor, color: theme.textColor }}
        >
          <BootcampsForm
            handleOk={handleOk}
            sendLoading={sendLoading}
            modalValues={modalValues}
            clearForm={clearForm}
          />
        </Modal>
      </ModalWrapper>
    </div>
  );
};

export default Bootcamps;
