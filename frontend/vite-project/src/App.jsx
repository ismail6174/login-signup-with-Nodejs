import React from "react";
import { Routes, Route } from "react-router-dom";                  
import SignupForm from "./Form/SignUp";
import LoginForm from "./Form/Login";
 

const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  ); 
};

export default App;