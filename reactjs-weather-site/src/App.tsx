import React from "react";
import logo from "./logo.svg";
import "./App.css";
import HomePage from "pages/HomePage";
import Header from "components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      <HomePage />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
