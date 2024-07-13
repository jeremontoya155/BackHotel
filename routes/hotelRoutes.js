// routes/hotelRoutes.js
const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const { authenticateSession } = require('../middlewares/authMiddleware');

router.get('/hoteles', hotelController.getAllHoteles);

// Rutas protegidas para CRUD de hoteles
router.post('/hoteles', authenticateSession, hotelController.createHotel);
router.put('/hoteles/:id', authenticateSession, hotelController.updateHotel);
router.delete('/hoteles/:id', authenticateSession, hotelController.deleteHotel);

module.exports = router;
