const express = require('express');
const dotenc = require("dotenv").config();
const cors = require('cors');
const oracledb = require('oracledb');
const { initializePool,getPool } = require('./config/dbConnection');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json()); // For parsing application/json

// routes
app.use("/api/gatepass",require("./routes/gatepassRoutes"));//known as middleware

// Start the server and initialize the connection pool
async function startServer() {
    await initializePool();

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });

    // app.listen(PORT, '192.168.70.71', () => {//harsh
    //     console.log(`Server is running on http://192.168.70.71:${PORT}`);
    // });

    app.listen(PORT, '192.168.19.9', () => {//sgvp
        console.log(`Server is running on http://192.168.19.9:${PORT}`);
    });

    // app.listen(PORT, '10.7.68.89', () => {//nirma
    //     console.log(`Server is running on http://10.7.68.89:${PORT}`);
    // });
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