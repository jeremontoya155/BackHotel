require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const hotelRoutes = require('./routes/hotelRoutes');

const app = express();
const port = process.env.PORT || 4000;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

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
