import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<UserDashboard />} />
          {/* <Route
        path="/create"
        element={<Create />}
      />
      <Route 
        path="/success" 
        element={<Success />} 
      />
      <Route 
        path="/orderHistory" 
        element={<OrderHistory />} 
      /> */}
        </Routes>
        <Home />
      </Router>
    </div>
  );
}

export default App;
