import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import UserList from "./UserList";
import UserForm from "./UserForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/UserList" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
