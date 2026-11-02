
import React, { useState, useEffect } from "react";

function ClinicForm({ onSubmit, editingClinic, onCancel }) {

    const [clinicName, setClinicName] = useState("");
    const [dentistName, setDentistName] = useState("");
    const [phone, setPhone] = useState("");
    const [consultationFee, setConsultationFee] = useState("");

    useEffect(() => {
        if (editingClinic) {
            setClinicName(editingClinic.clinicName);
            setDentistName(editingClinic.dentistName);
            setPhone(editingClinic.phone);
            setConsultationFee(editingClinic.consultationFee);
        }
        else {
            setClinicName("");
            setDentistName("");
            setPhone("");
            setConsultationFee("");
        }
    }, [editingClinic]);

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            clinicName,
            dentistName,
            phone,
            consultationFee: Number(consultationFee)
        });
    };

    return (
        <div className="form-container">
            <h2>{editingClinic ? "Update Dental Clinic" : "Add New Dental Clinic"}</h2>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Clinic Name</label>
                    <input
                        type="text"
                        value={clinicName}
                        onChange={(e) => setClinicName(e.target.value)}
                        placeholder="Enter clinic name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Dentist Name</label>
                    <input
                        type="text"
                        value={dentistName}
                        onChange={(e) => setDentistName(e.target.value)}
                        placeholder="Enter dentist name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter 10-digit phone number"
                        pattern="[0-9]{10}"
                        maxLength="10"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Consultation Fee (₹)</label>
                    <input
                        type="number"
                        value={consultationFee}
                        onChange={(e) => setConsultationFee(e.target.value)}
                        placeholder="Enter consultation fee"
                        min="0"
                        step="0.01"
                        required
                    />
                </div>

                <div className="form-buttons">
                    <button type="submit" className="submit-btn">
                        {editingClinic ? "Update Clinic" : "Add Clinic"}
                    </button>

                    {editingClinic && (
                        <button type="button" className="cancel-btn" onClick={onCancel}>
                            Cancel
                        </button>
                    )}
                </div>

            </form>
        </div>
    );
}

export default ClinicForm;
