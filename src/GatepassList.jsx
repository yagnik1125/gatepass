// src/GatepassList.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
// import GatepassForm from './Gatepassform'; 

const GatepassList = () => {
    const [gatepasses, setGatepasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchGatepasses = async () => {
        try {
            // const response = await axios.get('http://localhost:5000/api/gatepass');
            const response = await axios.get('http://192.168.19.9:5000/api/gatepass');
            setGatepasses(response.data);
        } catch (err) {
            setError('Failed to fetch gatepass data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchGatepasses();
    }, []);

    const handleDelete = async (gatepass_number) => {
        try {
            await axios.delete('http://192.168.19.9:5000/api/deletegatepass', {
                data: { gatepass_number }
            });
            // Filter out the deleted gatepass from the state
            // setGatepasses(gatepasses.filter(gatepass => gatepass.gatepass_number !== gatepass_number));
            fetchGatepasses();
            alert('Gatepass deleted successfully.');
        } catch (err) {
            console.error(err);
            alert('Failed to delete gatepass.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {/* <GatepassForm onFormSubmit={fetchGatepasses} /> */}

            <h1>Gatepass Records</h1>

            <table>
                <thead>
                    <tr>
                        <th>Gatepass Number</th>
                        <th>Email</th>
                        <th>PIN Number</th>
                        <th>Room Number</th>
                        <th>Surname</th>
                        <th>Name</th>
                        <th>Father Name</th>
                        <th>Department</th>
                        <th>Outgoing Date</th>
                        <th>Outgoing Time</th>
                        <th>Permission Upto Date</th>
                        <th>Permission Upto Time</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {gatepasses.map((gatepass) => (
                        <tr key={gatepass.gatepass_number}>
                            <td>{gatepass.gatepass_number}</td>
                            <td>{gatepass.email}</td>
                            <td>{gatepass.pin_number}</td>
                            <td>{gatepass.room_number}</td>
                            <td>{gatepass.surname}</td>
                            <td>{gatepass.name}</td>
                            <td>{gatepass.father_name}</td>
                            <td>{gatepass.department}</td>
                            <td>{new Date(gatepass.outgoing_date).toLocaleDateString()}</td>
                            <td>{new Date(gatepass.outgoing_time).toLocaleTimeString()}</td>
                            <td>{new Date(gatepass.permission_upto_date).toLocaleDateString()}</td>
                            <td>{new Date(gatepass.permission_upto_time).toLocaleTimeString()}</td>
                            <td>{gatepass.reason}</td>
                            <td>
                                {/* <button onClick={() => handleDelete(gatepass.gatepass_number)}> */}
                                    <FontAwesomeIcon icon={faTrashAlt} style={{ color: 'red' }} onClick={() => handleDelete(gatepass.gatepass_number)}/>
                                {/* </button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GatepassList;
