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

const renderAdminPage = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM hoteles');
        const hoteles = result.rows;
        const { successMessage } = req.query;
        res.render('admin', { loggedIn: req.session.userId, hoteles, successMessage });
    } catch (error) {
        console.error('Error fetching hotels:', error);
        res.status(500).send('Server error');
    }
};

const createHotel = async (req, res) => {
    const { nombre, tipo_alojamiento, localidad, disponibilidad, precio, datos, cochera, link_booking, link_maps, imagen_principal_1, imagen_principal_2, imagen_principal_3 } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO hoteles (nombre, tipo_alojamiento, localidad, disponibilidad, precio, datos, cochera, link_booking, link_maps, imagen_principal_1, imagen_principal_2, imagen_principal_3) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
            [nombre, tipo_alojamiento, localidad, disponibilidad === 'on', precio, datos, cochera === 'on', link_booking, link_maps, imagen_principal_1, imagen_principal_2, imagen_principal_3]
        );
        res.redirect('/api/admin?successMessage=Hotel creado exitosamente');
    } catch (error) {
        console.error('Error creating hotel:', error);
        res.status(500).send('Server error');
    }
};

const updateHotel = async (req, res) => {
    const { id } = req.params;
    const { nombre, tipo_alojamiento, localidad, disponibilidad, precio, datos, cochera, link_booking, link_maps, imagen_principal_1, imagen_principal_2, imagen_principal_3 } = req.body;
    try {
        const result = await pool.query(
            'UPDATE hoteles SET nombre = $1, tipo_alojamiento = $2, localidad = $3, disponibilidad = $4, precio = $5, datos = $6, cochera = $7, link_booking = $8, link_maps = $9, imagen_principal_1 = $10, imagen_principal_2 = $11, imagen_principal_3 = $12 WHERE id = $13 RETURNING *',
            [nombre, tipo_alojamiento, localidad, disponibilidad === 'on', precio, datos, cochera === 'on', link_booking, link_maps, imagen_principal_1, imagen_principal_2, imagen_principal_3, id]
        );
        res.redirect('/api/admin?successMessage=Hotel actualizado exitosamente');
    } catch (error) {
        console.error('Error updating hotel:', error);
        res.status(500).send('Server error');
    }
};

const deleteHotel = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM hoteles WHERE id = $1', [id]);
        res.redirect('/api/admin?successMessage=Hotel eliminado exitosamente');
    } catch (error) {
        console.error('Error deleting hotel:', error);
        res.status(500).send('Server error');
    }
};

module.exports = {
    getAllHoteles,
    renderAdminPage,
    createHotel,
    updateHotel,
    deleteHotel
};
