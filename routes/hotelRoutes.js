const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const { authenticateSession } = require('../middlewares/authMiddleware');

router.get('/hoteles', hotelController.getAllHoteles);

// Ruta de búsqueda
router.get('/hoteles/search', authenticateSession, hotelController.searchHoteles);

// Rutas protegidas para CRUD de hoteles
router.post('/hoteles', authenticateSession, hotelController.createHotel);
router.put('/hoteles/:id', authenticateSession, hotelController.updateHotel);
router.delete('/hoteles/:id', authenticateSession, hotelController.deleteHotel);

// Ruta para renderizar la página de administración de hoteles
router.get('/admin', authenticateSession, hotelController.renderAdminPage);

module.exports = router;
