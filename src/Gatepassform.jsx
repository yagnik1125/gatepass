// src/GatepassForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const GatepassForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        pin_number: '',
        room_number: '',
        surname: '',
        name: '',
        father_name: '',
        department: 'college student',
        outgoing_date: '',
        outgoing_time: '',
        permission_upto_date: '',
        permission_upto_time: '',
        reason: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const responselocal = await axios.post('http://localhost:5000/api/gatepassform', formData);
            const response = await axios.post('http://192.168.19.9:5000/api/gatepassform', formData);
            // console.log('Response:', response.data);
            // Handle successful submission (e.g., reset form, show a success message)
            alert('Gatepass submitted successfully!');
            console.log(response);
            // setFormData({
            //     email: '',
            //     pin_number: '',
            //     room_number: '',
            //     surname: '',
            //     name: '',
            //     father_name: '',
            //     department: 'college student',
            //     outgoing_date: '',
            //     outgoing_time: '',
            //     permission_upto_date: '',
            //     permission_upto_time: '',
            //     reason: ''
            // });
        } catch (error) {
            console.error('Error submitting gatepass:', error);
            alert('Failed to submit gatepass.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Gatepass Form</h1>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
                <label>PIN No:</label>
                <input type="number" name="pin_number" value={formData.pin_number} onChange={handleChange} required />
            </div>
            <div>
                <label>Room No:</label>
                <input type="number" name="room_number" value={formData.room_number} onChange={handleChange} required />
            </div>
            <div>
                <label>Surname:</label>
                <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />
            </div>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Father Name:</label>
                <input type="text" name="father_name" value={formData.father_name} onChange={handleChange} required />
            </div>
            <div>
                <label>Department:</label>
                <select name="department" value={formData.department} onChange={handleChange}>
                    <option value="college student">College Student</option>
                    <option value="school student">School Student</option>
                    <option value="staff">Staff</option>
                </select>
            </div>
            <div>
                <label>Outgoing Date:</label>
                <input type="date" name="outgoing_date" value={formData.outgoing_date} onChange={handleChange} required />
            </div>
            <div>
                <label>Outgoing Time:</label>
                <input type="time" name="outgoing_time" value={formData.outgoing_time} onChange={handleChange} required />
            </div>
            <div>
                <label>Permission Upto Date:</label>
                <input type="date" name="permission_upto_date" value={formData.permission_upto_date} onChange={handleChange} required />
            </div>
            <div>
                <label>Permission Upto Time:</label>
                <input type="time" name="permission_upto_time" value={formData.permission_upto_time} onChange={handleChange} required />
            </div>
            <div>
                <label>Reason:</label>
                <textarea name="reason" value={formData.reason} onChange={handleChange} required />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default GatepassForm;
