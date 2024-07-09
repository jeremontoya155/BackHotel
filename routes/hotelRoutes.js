const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/hoteles', hotelController.getAllHoteles);

// Rutas protegidas para CRUD de hoteles
router.post('/hoteles', authenticateToken, hotelController.createHotel);
router.put('/hoteles/:id', authenticateToken, hotelController.updateHotel);
router.delete('/hoteles/:id', authenticateToken, hotelController.deleteHotel);

module.exports = router;
