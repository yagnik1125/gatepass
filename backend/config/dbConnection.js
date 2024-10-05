const oracledb = require('oracledb');

// Connection pool variable
let pool;

// Function to initialize the connection pool
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
    return pool;
}

// Export the initializePool function and pool variable
module.exports = {
    initializePool,
    getPool: () => pool // Provide a function to get the pool
};
