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
            if (password === user.password) { // Comparación de contraseñas en texto plano
                req.session.userId = user.id;
                res.json({ message: 'Login successful' });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Server error');
    }
};

const logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not log out');
        }
        res.json({ message: 'Logout successful' });
    });
};

module.exports = {
    loginUser,
    logoutUser
};
