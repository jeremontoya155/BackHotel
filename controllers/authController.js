const pool = require('../db');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error fetching user from database:', error);
        res.status(500).send('Server error');
    }
};

const register = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const result = await pool.query('INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *', [email, password, role]);
        const newUser = result.rows[0];
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error inserting user into database:', error);
        res.status(500).send('Server error');
    }
};

module.exports = {
    login,
    register
};
