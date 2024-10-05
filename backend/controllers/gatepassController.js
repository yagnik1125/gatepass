const asyncHandler = require("express-async-handler");
const { getPool } = require('../config/dbConnection');


//@decription Fetch All gatepasses
//@route GET /api/gatepass
//@access public

const fetchAllGatepass = asyncHandler(async (req, res) => { //gonna return request and results
    let connection;

    try {
        // connection = await getConnection();
        const pool = getPool();
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
                date_in: row[13],
                time_in: row[14]
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


//@decription Create Gatepass entry
//@route POST /api/gatepass
//@access public

const createGatepass = asyncHandler(async (req, res) => { //gonna return request and results
    let connection;
    let { email, pin_number, room_number, surname, name, father_name, department, outgoing_date, outgoing_time, permission_upto_date, permission_upto_time, reason } = req.body;
    outgoing_time = outgoing_date + ' ' + outgoing_time;
    permission_upto_time = permission_upto_date + ' ' + permission_upto_time;

    console.log(req.body);

    try {
        // connection = await getConnection();
        const pool = getPool();
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


//@decription Update return entry
//@route PUT /api/gatepass
//@access public

const returnEntry = asyncHandler(async (req, res) => {
    let connection;
    let { gatepass_number, date_in, time_in } = req.body;
    time_in = date_in + " " + time_in;
    try {
        const pool = getPool();
        connection = await pool.getConnection();
        const query = `
        UPDATE gatepassdetails
        SET date_in = TO_DATE(:date_in, 'YYYY-MM-DD'), time_in = TO_TIMESTAMP(:time_in, 'YYYY-MM-DD HH24:MI:SS')
        WHERE gatepass_number = :gatepass_number
        `;
        const result = await connection.execute(query, { gatepass_number, date_in, time_in });
        await connection.commit();
        // Send the transformed response
        res.status(200).json({ message: 'Entry Done.' });
    }
    catch (err) {
        console.error('Error updating gatepass:', err);
        res.status(500).json({ error: 'Failed to update gatepass.' });
    }
    finally {
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

//@decription Delete Gatepass
//@route Delete /api/gatepass
//@access public

const deleteGatepass = asyncHandler(async (req, res) => {
    let connection;
    let { gatepass_number } = req.body;

    console.log(gatepass_number);

    try {
        // connection = await getConnection();
        const pool = getPool();
        connection = await pool.getConnection();
        // const result = await connection.execute(`INSERT INTO gatepassdetails (email,pin_number,room_number,surname,name,father_name,department,outgoing_date,outgoing_time,permission_upto_date,permission_upto_time,reason) VALUES (${email},${pin_number},${room_number},${surname},${name},${father_name},${department},TO_DATE(${outgoing_date}, 'YYYY-MM-DD'),TO_TIMESTAMP(${outgoing_time}, 'YYYY-MM-DD HH24:MI'),TO_DATE(${permission_upto_date}, 'YYYY-MM-DD'),TO_TIMESTAMP(${permission_upto_time}, 'YYYY-MM-DD HH24:MI'),${reason});`);

        // Constructing the SQL query with parameters
        const query = `
        DELETE FROM gatepassdetails WHERE gatepass_number = :gatepass_number
        `;

        // Executing the SQL query
        const result = await connection.execute(query, { gatepass_number });

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

//@decription GET Gatepass by PIN
//@route GET /api/gatepass
//@access public

const gatepassByDetails = asyncHandler(async (req, res) => { 
    let connection;
    const { pin_number, gatepass_number } = req.query;

    try {
        const pool = getPool();
        connection = await pool.getConnection();

        // Base query to fetch gatepass details
        let query = `
            SELECT * FROM gatepassdetails WHERE 1=1
        `;

        // Add conditions dynamically based on provided query params
        // const conditions = [];
        const params = {};

        // Add conditions based on the presence of query parameters
        if (pin_number && gatepass_number) {
            // If both pin_number and gatepass_number are provided, fetch records matching either one
            query += ` AND (pin_number = :pin_number OR gatepass_number = :gatepass_number)`;
            params.pin_number = pin_number;
            params.gatepass_number = gatepass_number;
        } else if (pin_number) {
            // If only pin_number is provided
            query += ` AND pin_number = :pin_number`;
            params.pin_number = pin_number;
        } else if (gatepass_number) {
            // If only gatepass_number is provided
            query += ` AND gatepass_number = :gatepass_number`;
            params.gatepass_number = gatepass_number;
        }

        // Execute the query with dynamic parameters
        const result = await connection.execute(query, params);

        await connection.commit();

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
                date_in: row[13],
                time_in: row[14]
            };
        });

        // Send the transformed response
        res.status(200).json(transformedResults);
    }
    catch (err) {
        console.error('Error fetching gatepass:', err);
        res.status(500).json({ error: 'Failed to fetch gatepass.' });
    }
    finally {
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

module.exports = { fetchAllGatepass, createGatepass, returnEntry, deleteGatepass,gatepassByDetails };