require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const methodOverride = require('method-override');
const hotelRoutes = require('./routes/hotelRoutes');
const authRoutes = require('./routes/authRoutes');
const { authenticateSession } = require('./middlewares/authMiddleware');

const app = express();
const port = process.env.PORT || 8000;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para habilitar PUT y DELETE en formularios HTML
app.use(methodOverride('_method'));

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para sesiones
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambiar a true en producción
}));

// Ejemplo de manejo de ruta para verificar el estado de inicio de sesión
app.get('/api/check-login', (req, res) => {
    if (req.session.userId) {
        res.json({
            loggedIn: true,
            userId: req.session.userId
        });
    } else {
        res.json({
            loggedIn: false
        });
    }
});

// Usar las rutas de autenticación
app.use('/api', authRoutes);

// Usar las rutas de hotel
app.use('/api', hotelRoutes);

// Ruta principal para servir la página HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.render('login', { loggedIn: req.session.userId });
});

// Redirigir a /admin y que el controlador maneje el renderizado
app.get('/admin', authenticateSession, (req, res) => {
    res.redirect('/api/admin');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
