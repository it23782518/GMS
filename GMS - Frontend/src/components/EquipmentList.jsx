import { useEffect, useState } from "react";
import {
  getEquipment,
  deleteEquipment,
  updateEquipmentStatus,
  getEquipmentById,
  updateEquipmentMaintenanceDate,
  searchEquipmentByName,
} from "../api";

const EquipmentList = () => {
  const [equipment, setEquipment] = useState([]);
  const [searchEquipment, setSearchEquipment] = useState([]);
  const [displayEquipment, setDisplayEquipment] = useState([]);
  const [search, setSearch] = useState("");
  const [statuses, setStatuses] = useState({});
  const [maintenanceDates, setMaintenanceDates] = useState({});

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await getEquipment();
        setEquipment(response.data);
      } catch (error) {
        console.error("Error fetching equipment: ", error);
      }
    };
    fetchEquipment();
  }, []);

  const onDelete = async (id) => {
    try {
      await deleteEquipment(id);
      setEquipment(equipment.filter((item) => item.id !== id));
      alert("Equipment deleted successfully");
    } catch (error) {
      console.error("Error deleting equipment: ", error);
      alert("Error deleting equipment");
    }
  };

  const onUpdateStatus = async (id) => {
    try {
      const newStatus = statuses[id] || "AVAILABLE";
      await updateEquipmentStatus(id, newStatus);
      setEquipment(
          equipment.map((item) =>
              item.id === id ? { ...item, status: newStatus } : item
          )
      );
      alert("Equipment status updated successfully");
    } catch (error) {
      console.error("Error updating equipment status: ", error);
      alert("Error updating equipment status");
    }
  };

  const onSearch = async () => {
    if (!search) {
      setDisplayEquipment(equipment);
      return;
    }
    try {
      if (!isNaN(search)) {
        const response = await getEquipmentById(search);
        setSearchEquipment([response.data]);
        setDisplayEquipment([response.data]);
      } else {
        const response = await searchEquipmentByName(search);
        setSearchEquipment(response.data);
        setDisplayEquipment(response.data);
      }
    } catch (error) {
      console.error("Error fetching equipment: ", error);
      alert("Equipment not found");
    }
  };

  useEffect(() => {
    if (searchEquipment.length === 0) {
      setDisplayEquipment(equipment);
    } else {
      setDisplayEquipment(searchEquipment);
    }
  }, [equipment, searchEquipment]);

  const onMaintenanceDate = async (id) => {
    try {
      const maintenanceDate = maintenanceDates[id];
      if (!maintenanceDate) {
        alert("Please select a maintenance date");
        return;
      }
      await updateEquipmentMaintenanceDate(id, maintenanceDate);
      setEquipment(
          equipment.map((item) =>
              item.id === id ? { ...item, lastMaintenanceDate: maintenanceDate } : item
          )
      );
      alert("Equipment maintenance date updated successfully");
    } catch (error) {
      console.error("Error updating equipment maintenance date: ", error);
      alert("Error updating equipment maintenance date");
    }
  };

  return (
      <div className="equipment-list-container">
        <div className="search-section">
          <input
              className="search-input"
              placeholder="Search equipment by ID, Name or Category"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-button" onClick={onSearch}>
            Search
          </button>
        </div>

        <div className="table-container">
          <table className="equipment-table">
            <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Purchase Date</th>
              <th>Last Repair Date</th>
              <th>Warranty Expiry</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {displayEquipment.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>
                    {item.status}
                    <select
                        value={statuses[item.id] || item.status}
                        onChange={(e) =>
                            setStatuses((prev) => ({ ...prev, [item.id]: e.target.value }))
                        }
                        className="status-select"
                    >
                      <option value="AVAILABLE">Available</option>
                      <option value="UNAVAILABLE">Unavailable</option>
                      <option value="UNDER_MAINTENANCE">Under Maintenance</option>
                      <option value="OUT_OF_ORDER">Out of Order</option>
                    </select>
                    <button
                        className="update-button"
                        onClick={() => onUpdateStatus(item.id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>{item.purchaseDate}</td>
                  <td>
                    {item.lastMaintenanceDate}
                    <input
                        type="date"
                        value={maintenanceDates[item.id] || ""}
                        onChange={(e) =>
                            setMaintenanceDates((prev) => ({ ...prev, [item.id]: e.target.value }))
                        }
                        className="maintenance-date-input"
                    />
                    <button
                        className="update-button"
                        onClick={() => onMaintenanceDate(item.id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>{item.warrantyExpiry}</td>
                  <td>
                    <button
                        className="delete-button"
                        onClick={() => onDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default EquipmentList;
