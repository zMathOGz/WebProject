const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const ReservaController = require('../controllers/ReservaController');
const EspacoController = require('../controllers/EspacoController');
const UserController = require('../controllers/UserController');

const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) return next();
    res.status(401).json({ error: 'Não autorizado' });
};

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/auth/me', AuthController.me);
router.post('/usuarios', UserController.store);

router.get('/espacos', EspacoController.index);
router.post('/espacos', isAuthenticated, EspacoController.store);
router.delete('/espacos/:id', isAuthenticated, EspacoController.delete);

router.get('/reservas', isAuthenticated, ReservaController.index);
router.post('/reservas', isAuthenticated, ReservaController.store);
router.delete('/reservas/:id', isAuthenticated, ReservaController.delete);

module.exports = router;