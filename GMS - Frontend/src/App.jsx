import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EquipmentList from "./components/EquipmentList";
import AddEquipmentForm from "./components/AddEquipmentForm";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1 className="app-title">Equipment Management</h1>
        
        {/* Navigation Buttons */}
        <nav>
          <Link to="/equipment-list">
            <button className="nav-button">View Equipment</button>
          </Link>
          <Link to="/Add-equipment">
            <button className="nav-button">Add Equipment</button>
          </Link>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/equipment-list" element={<EquipmentList />} />
          <Route path="/Add-equipment" element={<AddEquipmentForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
