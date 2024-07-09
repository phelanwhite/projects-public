import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Header from "./components/Header";
import CountryId from "./pages/CountryId";

function App() {
  return (
    <div>
      <Header />
      <div className="py-8">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/:id" element={<CountryId />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
