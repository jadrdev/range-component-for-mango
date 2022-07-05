import React from "react";
import { Routes, Route } from "react-router-dom";
import Menu from "../components/Menu";
import Exercise1 from "../pages/Exercise1";
import Exercise2 from "../pages/Exercise2";
import Home  from "../pages/Home";

const App = () => {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="exercise1" element={<Exercise1 />} />
        <Route path="exercise2" element={<Exercise2 />} />
      </Routes>

    </>
  );
};

export default App;