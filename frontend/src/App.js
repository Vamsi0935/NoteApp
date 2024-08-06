import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
//import All from "./components/Cards/All";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/all" element={<All />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
