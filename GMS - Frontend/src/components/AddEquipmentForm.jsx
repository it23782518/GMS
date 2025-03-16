import { useState } from "react";
import { addEquipment } from "../api";

const AddEquipmentForm = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("AVAILABLE");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [lastMaintenanceDate, setLastMaintenanceDate] = useState("");
  const [warrantyExpiry, setWarrantyExpiry] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const equipmentData = {
      name,
      category,
      status,
      purchaseDate,
      lastMaintenanceDate: lastMaintenanceDate || null,
      warrantyExpiry: warrantyExpiry || null,
    };

    try {
      await addEquipment(equipmentData);
      alert("Equipment added successfully");
      setName("");
      setCategory("");
      setStatus("AVAILABLE");
      setPurchaseDate("");
      setLastMaintenanceDate("");
      setWarrantyExpiry("");
    } catch (error) {
      console.error("Error adding equipment: ", error);
      alert("Error adding equipment");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="equipment-form">
      <p>Equipment Name</p>
      <input
        className="form-input"
        type="text"
        placeholder="Equipment Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <p>Category</p>
      <input
        className="form-input"
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <p>Purchase Date</p>
      <input
        className="form-input"
        type="date"
        value={purchaseDate}
        onChange={(e) => setPurchaseDate(e.target.value)}
        required
      />
      <p>Last Maintenance Date</p>
      <input
        className="form-input"
        type="date"
        value={lastMaintenanceDate}
        onChange={(e) => setLastMaintenanceDate(e.target.value)}
      />
      <p>Warranty Expiry Date</p>
      <input
        className="form-input"
        type="date"
        value={warrantyExpiry}
        onChange={(e) => setWarrantyExpiry(e.target.value)}
      />
      <p>Status</p>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="form-select"
      >
        <option value="AVAILABLE">Available</option>
        <option value="UNDER_MAINTENANCE">Under Maintenance</option>
        <option value="UNAVAILABLE">Unavailable</option>
        <option value="OUT_OF_ORDER">Out of Order</option>
      </select>
      <button className="form-submit-button" type="submit">
        Add Equipment
      </button>
    </form>
  );
};

export default AddEquipmentForm;
