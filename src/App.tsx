import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import { useAppDispatch } from "./hooks/redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { getUserData } from "./store/reducers/userReducer";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
