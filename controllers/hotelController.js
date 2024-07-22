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

const searchHoteles = async (req, res) => {
    const { query } = req.query;
    try {
        const result = await pool.query(
            `SELECT * FROM hoteles WHERE 
             nombre ILIKE $1 OR 
             localidad ILIKE $1 OR 
             direccion ILIKE $1`,
            [`%${query}%`]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error searching hotels:', error);
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
    const { nombre, tipo_alojamiento, localidad, disponibilidad, precio, datos, cochera, link_booking, link_maps, imagen_principal_1, imagen_principal_2, imagen_principal_3, calificacion, huespedes, direccion,banios,pileta,imagen_principal_4, imagen_principal_5  } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO hoteles (nombre, tipo_alojamiento, localidad, disponibilidad, precio, datos, cochera, link_booking, link_maps, imagen_principal_1, imagen_principal_2, imagen_principal_3, calificacion, huespedes, direccion,banios,pileta,imagen_principal_4,imagen_principal_5  ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,$16,$17,$18,$19) 
            RETURNING *`,
            [nombre, tipo_alojamiento, localidad, disponibilidad === 'on', precio, datos, cochera === 'on', link_booking, link_maps, imagen_principal_1, imagen_principal_2, imagen_principal_3, calificacion, huespedes, direccion,banios,pileta,imagen_principal_4, imagen_principal_5 ]
        );
        res.redirect('/api/admin?successMessage=Hotel creado exitosamente');
    } catch (error) {
        console.error('Error creating hotel:', error);
        res.status(500).send('Server error');
    }
};

const updateHotel = async (req, res) => {
    const { id } = req.params;
    const { nombre, tipo_alojamiento, localidad, disponibilidad, precio, datos, cochera, link_booking, link_maps, imagen_principal_1, imagen_principal_2, imagen_principal_3, calificacion, huespedes, direccion,banios, pileta,imagen_principal_4,imagen_principal_5  } = req.body;
    try {
        const result = await pool.query(
            `UPDATE hoteles 
            SET nombre = $1, tipo_alojamiento = $2, localidad = $3, disponibilidad = $4, precio = $5, datos = $6, cochera = $7, link_booking = $8, link_maps = $9, imagen_principal_1 = $10, imagen_principal_2 = $11, imagen_principal_3 = $12, calificacion = $13, huespedes = $14, direccion = $15 ,baños = $16,pileta = $17,imagen_principal_4=$18,imagen_principal_5=$19  
            WHERE id = $20 
            RETURNING *`,
            [nombre, tipo_alojamiento, localidad, disponibilidad === 'on', precio, datos, cochera === 'on', link_booking, link_maps, imagen_principal_1, imagen_principal_2, imagen_principal_3, calificacion, huespedes, direccion,banios,pileta,imagen_principal_4,imagen_principal_5,   id]
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
    searchHoteles,
    renderAdminPage,
    createHotel,
    updateHotel,
    deleteHotel
};
