const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { getMovements, createMovement, updateMovement, deleteMovement, getCategories, getAccountMovementType } = require('../controllers/movements');

const router = Router();

router.use( validarJWT );

// Obtener todos los movimientos
router.get('/', getMovements);

// Registrar movimiento
router.post(
    '/',
    [
        check('amount','Amount must be an INT').isNumeric(),
        validarCampos
    ],
    createMovement);

// Eliminar movimiento
router.delete('/:id', deleteMovement);

// Actualizar movimiento
router.put('/:id', updateMovement);

// Obtener las categorias de los movimientos
router.get('/categories', getCategories);

// Obtener tipos de movimientos
router.get('/types', getAccountMovementType);


module.exports = router

