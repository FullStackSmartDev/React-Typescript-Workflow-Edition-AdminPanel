import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "./routes/MainRouter";

function App(props: any) {
  return (
    <div className="csr-root">
      <Router>
        <MainRouter {...props} />
      </Router>
    </div>
  );
}

export default App;
