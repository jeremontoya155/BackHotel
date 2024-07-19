const express = require('express');
const router = express.Router();
const { loginUser, logoutUser } = require('../controllers/authController');

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para cerrar sesión
router.get('/logout', logoutUser);

module.exports = router;
