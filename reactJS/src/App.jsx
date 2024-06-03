import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <Outlet />
      <ToastContainer />
    </div>
  );
}
export default App;