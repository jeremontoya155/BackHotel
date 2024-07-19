const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            if (password === user.password) { // Comparación directa de contraseñas (no recomendado para producción)
                req.session.userId = user.id;
                res.redirect('/admin'); // Redirigir a la página de administración
            } else {
                res.status(401).json({ message: 'Credenciales inválidas' });
            }
        } else {
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

const logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('No se pudo cerrar sesión');
        }
        res.redirect('/login'); // Redirigir a la página de inicio de sesión
    });
};

module.exports = {
    loginUser,
    logoutUser
};

