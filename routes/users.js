const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { getMyUser, updateUser } = require('../controllers/users');

const router = Router();

router.use( validarJWT );

// Obtener Usuario logeado
router.get('/', getMyUser);
router.put('/', updateUser);

module.exports = router

