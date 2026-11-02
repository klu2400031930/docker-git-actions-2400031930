
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Search, Pencil, Trash2, Stethoscope, Building2, IndianRupee, RefreshCw } from "lucide-react";
import ClinicForm from "./components/ClinicForm";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:2008/dentalclinic";

function App() {

    const [clinics, setClinics] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingClinic, setEditingClinic] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchClinics();
    }, []);

    const fetchClinics = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/displayall`);
            setClinics(response.data);
        }
        catch (error) {
            console.error("Error fetching clinics:", error);
            setMessage("Unable to connect to backend. Please check the server.");
        }
        finally {
            setLoading(false);
        }
    };

    const handleSave = async (clinicData) => {
        try {
            if (editingClinic) {
                await axios.put(`${API_URL}/update/${editingClinic.id}`, clinicData);
                setMessage("Clinic updated successfully!");
            }
            else {
                await axios.post(`${API_URL}/add`, clinicData);
                setMessage("Clinic added successfully!");
            }

            setShowForm(false);
            setEditingClinic(null);
            fetchClinics();
        }
        catch (error) {
            console.error("Error saving clinic:", error);
            setMessage("Unable to save clinic. Please try again.");
        }
    };

    const handleEdit = (clinic) => {
        setEditingClinic(clinic);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this clinic?");

        if (confirmDelete) {
            try {
                await axios.delete(`${API_URL}/delete/${id}`);
                setMessage("Clinic deleted successfully!");
                fetchClinics();
            }
            catch (error) {
                console.error("Error deleting clinic:", error);
                setMessage("Unable to delete clinic.");
            }
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingClinic(null);
    };

    // Search by Clinic ID, Clinic Name and Dentist Name
    const filteredClinics = clinics.filter((clinic) =>
        String(clinic.id).includes(searchTerm.trim()) ||
        clinic.clinicName.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
        clinic.dentistName.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

    const totalClinics = clinics.length;

    const averageFee = totalClinics > 0
        ? clinics.reduce((total, clinic) => total + Number(clinic.consultationFee), 0) / totalClinics
        : 0;

    return (
        <div className="app-container">

            <header className="navbar">
                <div className="brand">
                    <div className="brand-icon">
                        <Stethoscope size={25} />
                    </div>
                    <div>
                        <h2>DentalCare</h2>
                        <span>Clinic Management System</span>
                    </div>
                </div>

                <button className="refresh-btn" onClick={fetchClinics}>
                    <RefreshCw size={16} /> Refresh
                </button>
            </header>

            <main className="main-content">

                <div className="welcome-section">
                    <div>
                        <h1>Dental Clinic Dashboard</h1>
                        <p>Manage your dental clinic records easily.</p>
                    </div>

                    <button className="add-btn" onClick={() => {
                        setEditingClinic(null);
                        setShowForm(true);
                    }}>
                        <Plus size={18} /> Add Clinic
                    </button>
                </div>

                {message && (
                    <div className="message-box">
                        {message}
                        <button onClick={() => setMessage("")}>×</button>
                    </div>
                )}

                <div className="stats-container">

                    <div className="stat-card">
                        <div className="stat-icon blue">
                            <Building2 size={24} />
                        </div>
                        <div>
                            <p>Total Clinics</p>
                            <h2>{totalClinics}</h2>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon green">
                            <Stethoscope size={24} />
                        </div>
                        <div>
                            <p>Total Dentists</p>
                            <h2>{totalClinics}</h2>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon orange">
                            <IndianRupee size={24} />
                        </div>
                        <div>
                            <p>Average Consultation Fee</p>
                            <h2>₹{averageFee.toFixed(2)}</h2>
                        </div>
                    </div>

                </div>

                {showForm && (
                    <ClinicForm
                        onSubmit={handleSave}
                        editingClinic={editingClinic}
                        onCancel={handleCancel}
                    />
                )}

                <section className="table-section">

                    <div className="table-header">
                        <div>
                            <h2>Dental Clinics</h2>
                            <p>Manage all your clinic records</p>
                        </div>

                        <div className="search-box">
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="Search by ID, clinic or dentist..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {loading ? (
                        <p className="status-message">Loading clinics...</p>
                    ) : (
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Clinic Name</th>
                                        <th>Dentist Name</th>
                                        <th>Phone</th>
                                        <th>Consultation Fee</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredClinics.length > 0 ? (
                                        filteredClinics.map((clinic) => (
                                            <tr key={clinic.id}>
                                                <td>#{clinic.id}</td>
                                                <td className="clinic-name">{clinic.clinicName}</td>
                                                <td>{clinic.dentistName}</td>
                                                <td>{clinic.phone}</td>
                                                <td>₹{Number(clinic.consultationFee).toFixed(2)}</td>
                                                <td>
                                                    <div className="action-buttons">
                                                        <button
                                                            className="edit-btn"
                                                            onClick={() => handleEdit(clinic)}
                                                            title="Edit"
                                                        >
                                                            <Pencil size={16} />
                                                        </button>

                                                        <button
                                                            className="delete-btn"
                                                            onClick={() => handleDelete(clinic.id)}
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="empty-message">
                                                No dental clinics found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                </section>

                <footer>
                    DentalCare Clinic Management System
                </footer>

            </main>
        </div>
    );
}

export default App;
