/* 
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuarios } = require('../controllers/usuarios')
 
const router = Router();


router.get('/', getUsuarios);

router.post('/', 
[
    // Que no esté vacío
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
]
, crearUsuarios);




module.exports = router;