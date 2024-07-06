const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const getAllHoteles = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM hoteles');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching data from database:', error);
        res.status(500).send('Server error');
    }
};

module.exports = {
    getAllHoteles
};
