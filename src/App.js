import React from "react";
import Layout from "./components/Layout";
import "./index.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Students from "./pages/Students";
import Groups from "./pages/Groups";
import { ToastContainer } from "react-toastify";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import { TOKEN } from "./const";

const App = () => {
  const token = localStorage.getItem(TOKEN);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="students" /> : <Navigate to="login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/">
          <Route
            path="students"
            element={
              <Layout>
                <Students />
              </Layout>
            }
          />
          <Route path="groups" element={<Groups />} />
          <Route path="courses" element={<Courses />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
