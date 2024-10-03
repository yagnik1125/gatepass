const express = require('express');
const dotenc = require("dotenv").config();
const cors = require('cors');
const oracledb = require('oracledb');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json()); // For parsing application/json

// Connection pool
let pool;

// Connect to Oracle Database and create a pool
async function initializePool() {
    try {
        pool = await oracledb.createPool({
            user: 'test', // your username
            password: 'admin', // your password
            connectionString: 'localhost/XEPDB1', // your connection string
            poolMin: 10, // Minimum number of connections
            poolMax: 10, // Maximum number of connections
            poolIncrement: 0 // Number of connections to create when more are needed
        });
        console.log('Connection pool created');
    } catch (err) {
        console.error('Error creating connection pool', err);
        process.exit(1); // Exit the process if pool creation fails
    }
}

// // Connect to Oracle Database
// async function getConnection() {
//     return oracledb.getConnection({
//         user: 'test', // your username
//         password: 'admin', // your password
//         connectionString: 'localhost/XEPDB1' // your connection string
//     });
// }
// // API endpoint to get users
// app.get('/api/users', async (req, res) => {
//     let connection;
//     try {
//         connection = await getConnection();
//         const result = await connection.execute('SELECT * FROM users');
//         // console.log("result->",result);
//         res.json(result.rows);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error retrieving users');
//     } finally {
//         if (connection) {
//             try {
//                 await connection.close();
//             } catch (err) {
//                 console.error(err);
//             }
//         }
//     }
// });

// API endpoint to get gatepass
app.get('/api/gatepass', async (req, res) => {
    let connection;

    try {
        // connection = await getConnection();
        connection = await pool.getConnection();
        const result = await connection.execute('SELECT * FROM gatepassdetails ORDER BY gatepass_number');
        console.log("result.rows->", result.rows);

        // Transform the result to the desired format
        const transformedResults = result.rows.map(row => {
            return {
                gatepass_number: row[0],
                email: row[1],
                pin_number: row[2],
                room_number: row[3],
                surname: row[4],
                name: row[5],
                father_name: row[6],
                department: row[7],
                outgoing_date: row[8],
                outgoing_time: row[9],
                permission_upto_date: row[10],
                permission_upto_time: row[11],
                reason: row[12],
                date_in:row[13],
                time_in:row[14]
            };
        });
        // Send the transformed response
        res.json(transformedResults);

        // res.json(result.rows); //old way
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving users');
    } finally {
        if (connection) {
            try {
                // Release the connection back to the pool
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

//post api for creating gatepass
app.post('/api/gatepassForm', async (req, res) => {
    let connection;
    let { email, pin_number, room_number, surname, name, father_name, department, outgoing_date, outgoing_time, permission_upto_date, permission_upto_time, reason } = req.body;
    outgoing_time = outgoing_date + ' ' + outgoing_time;
    permission_upto_time = permission_upto_date + ' ' + permission_upto_time;

    console.log(req.body);

    try {
        // connection = await getConnection();
        connection = await pool.getConnection();
        // const result = await connection.execute(`INSERT INTO gatepassdetails (email,pin_number,room_number,surname,name,father_name,department,outgoing_date,outgoing_time,permission_upto_date,permission_upto_time,reason) VALUES (${email},${pin_number},${room_number},${surname},${name},${father_name},${department},TO_DATE(${outgoing_date}, 'YYYY-MM-DD'),TO_TIMESTAMP(${outgoing_time}, 'YYYY-MM-DD HH24:MI'),TO_DATE(${permission_upto_date}, 'YYYY-MM-DD'),TO_TIMESTAMP(${permission_upto_time}, 'YYYY-MM-DD HH24:MI'),${reason});`);

        // Constructing the SQL query with parameters
        const query = `
            INSERT INTO gatepassdetails (
                email,
                pin_number,
                room_number,
                surname,
                name,
                father_name,
                department,
                outgoing_date,
                outgoing_time,
                permission_upto_date,
                permission_upto_time,
                reason
            ) VALUES (
                :email,
                :pin_number,
                :room_number,
                :surname,
                :name,
                :father_name,
                :department,
                TO_DATE(:outgoing_date, 'YYYY-MM-DD'),
                TO_TIMESTAMP(:outgoing_time, 'YYYY-MM-DD HH24:MI'),
                TO_DATE(:permission_upto_date, 'YYYY-MM-DD'),
                TO_TIMESTAMP(:permission_upto_time, 'YYYY-MM-DD HH24:MI'),
                :reason
            )
        `;

        // Executing the SQL query
        const result = await connection.execute(query, {
            email,
            pin_number,
            room_number,
            surname,
            name,
            father_name,
            department,
            outgoing_date,
            outgoing_time,
            permission_upto_date,
            permission_upto_time,
            reason
        });

        // Commit the changes to the database
        await connection.commit();

        // Sending a response back to the client
        res.status(201).json({ message: 'Gatepass created successfully', id: result.lastRowid });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving users');
    } finally {
        if (connection) {
            try {
                // Release the connection back to the pool
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

//delete api for deleting gatepass
app.delete('/api/deleteGatepass', async (req, res) => {
    let connection;
    let {gatepass_number} = req.body;

    console.log(gatepass_number);

    try {
        // connection = await getConnection();
        connection = await pool.getConnection();
        // const result = await connection.execute(`INSERT INTO gatepassdetails (email,pin_number,room_number,surname,name,father_name,department,outgoing_date,outgoing_time,permission_upto_date,permission_upto_time,reason) VALUES (${email},${pin_number},${room_number},${surname},${name},${father_name},${department},TO_DATE(${outgoing_date}, 'YYYY-MM-DD'),TO_TIMESTAMP(${outgoing_time}, 'YYYY-MM-DD HH24:MI'),TO_DATE(${permission_upto_date}, 'YYYY-MM-DD'),TO_TIMESTAMP(${permission_upto_time}, 'YYYY-MM-DD HH24:MI'),${reason});`);

        // Constructing the SQL query with parameters
        const query = `
            DELETE FROM gatepassdetails WHERE gatepass_number = :gatepass_number
        `;

        // Executing the SQL query
        const result = await connection.execute(query, {gatepass_number});

        // Commit the changes to the database
        await connection.commit();

        // Sending a response back to the client
        res.status(200).json({ message: 'Gatepass deleted successfully', rowsAffected: result.rowsAffected });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting gatepass');
    } finally {
        if (connection) {
            try {
                // Release the connection back to the pool
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

app.put('/api/updateEntry')

// Start the server and initialize the connection pool
async function startServer() {
    await initializePool();

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });

    app.listen(PORT, '192.168.19.9', () => {
        console.log(`Server is running on http://192.168.19.9:${PORT}`);
    });
}

// Call the function to start the server
startServer().catch(err => {
    console.error('Error starting server:', err);
});





// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// // Start the server
// app.listen(5000, '192.168.19.9', () => {
//     console.log(`Server is running on http://192.168.19.9:5000`);
// });