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

const createHotel = async (req, res) => {
    const { tipo_alojamiento, ubicacion, disponibilidad, precio, datos, cochera, link_booking, link_maps, numero_telefono, imagen_principal_1, imagen_principal_2, imagen_principal_3 } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO hoteles (tipo_alojamiento, ubicacion, disponibilidad, precio, datos, cochera, link_booking, link_maps, numero_telefono, imagen_principal_1, imagen_principal_2, imagen_principal_3) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
            [tipo_alojamiento, ubicacion, disponibilidad, precio, datos, cochera, link_booking, link_maps, numero_telefono, imagen_principal_1, imagen_principal_2, imagen_principal_3]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating hotel:', error);
        res.status(500).send('Server error');
    }
};

const updateHotel = async (req, res) => {
    const { id } = req.params;
    const { tipo_alojamiento, ubicacion, disponibilidad, precio, datos, cochera, link_booking, link_maps, numero_telefono, imagen_principal_1, imagen_principal_2, imagen_principal_3 } = req.body;
    try {
        const result = await pool.query(
            'UPDATE hoteles SET tipo_alojamiento = $1, ubicacion = $2, disponibilidad = $3, precio = $4, datos = $5, cochera = $6, link_booking = $7, link_maps = $8, numero_telefono = $9, imagen_principal_1 = $10, imagen_principal_2 = $11, imagen_principal_3 = $12 WHERE id = $13 RETURNING *',
            [tipo_alojamiento, ubicacion, disponibilidad, precio, datos, cochera, link_booking, link_maps, numero_telefono, imagen_principal_1, imagen_principal_2, imagen_principal_3, id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating hotel:', error);
        res.status(500).send('Server error');
    }
};

const deleteHotel = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM hoteles WHERE id = $1', [id]);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting hotel:', error);
        res.status(500).send('Server error');
    }
};

module.exports = {
    getAllHoteles,
    createHotel,
    updateHotel,
    deleteHotel
};
