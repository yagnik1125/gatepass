import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const GatepassList = () => {
    const [gatepassNumber, setGatepassNumber] = useState('');
    const [pinNumber, setPinNumber] = useState('');
    const [gatepasses, setGatepasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchGatepasses = async () => {
        try {
            // if (pinNumber) {
            //     console.log(pinNumber);
            //     // const response = await axios.get(`http://192.168.19.9:5000/api/gatepassByPin?pin_number=${pinNumber}`);//sgvp
            //     // const response = await axios.get('http://192.168.19.9:5000/api/gatepassByPin', {//sgvp
            //     const response = await axios.get('http://10.7.68.89:5000/api/gatepassByPin', {//nirma
            //         params: {
            //             pin_number: pinNumber
            //         }
            //     });
            //     // Handle successful response
            //     console.log(response.data);
            //     if (response.status === 200) {
            //         // Optionally refresh the data or update the table UI here
            //         setGatepasses(response.data);
            //     }
            // }
            // else if(gatepassNumber){
            //     console.log(gatepassNumber);
            //     // const response = await axios.get(`http://192.168.19.9:5000/api/gatepassByGatepassNumber?gatepass_number=${gatepassNumber}`);//sgvp
            //     // const response = await axios.get('http://192.168.19.9:5000/api/gatepassByGatepassNumber', {//sgvp
            //     const response = await axios.get('http://10.7.68.89:5000/api/gatepassByGatepassNumber', {//nirma
            //         params: {
            //             gatepass_number: gatepassNumber
            //         }
            //     });
            //     // Handle successful response
            //     console.log(response.data);
            //     if (response.status === 200) {
            //         // Optionally refresh the data or update the table UI here
            //         setGatepasses(response.data);
            //     }
            // }

            if (pinNumber || gatepassNumber) {
                // const response = await axios.get(`http://192.168.19.9:5000/api/gatepass/gatepassByDetails?pin_number=${pinNumber}?gatepass_number=${gatepassNumber}`);//sgvp
                // const response = await axios.get('http://192.168.70.71:5000/api/gatepass/gatepassByDetails', {//harsh
                const response = await axios.get('http://192.168.19.9:5000/api/gatepass/gatepassByDetails', {//sgvp
                // const response = await axios.get('http://10.7.68.89:5000/api/gatepass/gatepassByDetails', {//nirma
                    params: {
                        pin_number: pinNumber,
                        gatepass_number: gatepassNumber
                    }
                });
                // Handle successful response
                console.log(response.data);
                if (response.status === 200) {
                    // Optionally refresh the data or update the table UI here
                    setGatepasses(response.data);
                }
            }
            else {
                // const response = await axios.get(`http://192.168.70.71:5000/api/gatepass/fetchAllGatepass`);//harsh
                const response = await axios.get(`http://192.168.19.9:5000/api/gatepass/fetchAllGatepass`);//sgvp
                // const response = await axios.get(`http://10.7.68.89:5000/api/gatepass/fetchAllGatepass`);//nirma
                // Handle successful response
                if (response.status === 200) {
                    // Optionally refresh the data or update the table UI here
                    setGatepasses(response.data);
                }
            }
            // setGatepasses(response.data);
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

    // const handleEntry = async (gatepass_number) => {
    const handleEntry = async (gatepass_number, date_in, time_in) => {
        if (date_in === null && time_in === null) {
            const currentDate = new Date();

            console.log(currentDate);

            // // Get the current date and time in the required format
            // const date_in = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD format
            // const time_in = currentDate.toTimeString().split(' ')[0]; // HH:MM:SS format

            // Get the date in YYYY-MM-DD format
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so we add 1
            const day = String(currentDate.getDate()).padStart(2, '0');
            const date_in = `${year}-${month}-${day}`; // YYYY-MM-DD format

            // Get the time in HH:MM:SS format
            const hours = String(currentDate.getHours()).padStart(2, '0');
            const minutes = String(currentDate.getMinutes()).padStart(2, '0');
            const seconds = String(currentDate.getSeconds()).padStart(2, '0');
            const time_in = `${hours}:${minutes}:${seconds}`; // HH:MM:SS format

            console.log(date_in, time_in);

            try {
                // Make the API request to update the entry
                // const response = await axios.put(`http://192.168.70.71:5000/api/gatepass/returnEntry`, {//harsh
                const response = await axios.put(`http://192.168.19.9:5000/api/gatepass/returnEntry`, {//sgvp
                // const response = await axios.put(`http://10.7.68.89:5000/api/updateEntry`, {//nirma
                    gatepass_number,
                    date_in,
                    time_in
                });

                // Handle successful response
                if (response.status === 200) {
                    alert('Entry Done Successfully.');
                    fetchGatepasses();
                    // Optionally refresh the data or update the table UI here
                }
            } catch (error) {
                console.error('Error updating entry:', error);
                alert('Failed to update entry.');
            }
        }
    };

    const handleDelete = async (gatepass_number) => {
        try {
            // await axios.delete(`http://192.168.70.71:5000/api/gatepass/deleteGatepass`, {//harsh
            await axios.delete(`http://192.168.19.9:5000/api/gatepass/deleteGatepass`, {//sgvp
            // await axios.delete(`http://10.7.68.89:5000/api/gatepass/deleteGatepass`, {//nirma
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

            <h1 className="text-center mb-5 text-2xl font-bold">Gatepass Records</h1>

            <div>
                <input
                    type="text"
                    placeholder="Enter PIN Number"
                    value={pinNumber}
                    onChange={(e) => setPinNumber(e.target.value)}
                    className="p-2 rounded-full border-2 border-gray-300 focus:border-blue-500"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            fetchGatepasses(); // Call the fetchGatepasses function when Enter is pressed
                        }
                    }}
                />
                <input
                    type="text"
                    placeholder="Enter Gatepass Number"
                    value={gatepassNumber}
                    onChange={(e) => setGatepassNumber(e.target.value)}
                    className="p-2 rounded-full border-2 border-gray-300 focus:border-blue-500"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            fetchGatepasses(); // Call the fetchGatepasses function when Enter is pressed
                        }
                    }}
                />
                <button onClick={fetchGatepasses}>Find</button>
            </div>
            {error && <p style={{ color: '#e54522' }}>{error}</p>}

            {/* <div>
                
                <button onClick={fetchGatepasses}>Find</button>
            </div>
            {error && <p style={{ color: '#e54522' }}>{error}</p>} */}

            <table>
                <thead>
                    <tr>
                        <th></th>
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
                        <th>Date In</th>
                        <th>Time In</th>
                    </tr>
                </thead>
                <tbody>
                    {gatepasses.map((gatepass) => (
                        <tr key={gatepass.gatepass_number}>
                            <td>
                                {/* <button onClick={() => handleDelete(gatepass.gatepass_number)}> */}
                                <FontAwesomeIcon icon={faTrashAlt} style={{ color: '#e54522' }} onClick={() => handleDelete(gatepass.gatepass_number)} />
                                {/* </button> */}
                            </td>
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
                            <td>{gatepass.date_in ? new Date(gatepass.date_in).toLocaleDateString() : ''}</td>
                            <td>{gatepass.time_in ? new Date(gatepass.time_in).toLocaleTimeString() : ''}</td>
                            <td>
                                <button onClick={() => handleEntry(gatepass.gatepass_number, gatepass.date_in, gatepass.time_in)}>Entry</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GatepassList;
