import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "antd/dist/antd.css";
import Routes from "./routes/config";

const App = () => {
  return (
    <Suspense fallback={"loading..."}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
