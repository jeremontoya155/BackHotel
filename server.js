require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const hotelRoutes = require('./routes/hotelRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 8000;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para sesiones
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // En producción, asegúrate de cambiar secure a true
}));

// Usar las rutas de autenticación
app.use('/api', authRoutes);

// Usar las rutas de hotel
app.use('/api', hotelRoutes);

// Ruta principal para servir la página HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
