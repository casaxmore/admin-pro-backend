/* 
    ruta: /api/uploads/
*/

const { Router } = require("express");
const expressfileUpload = require('express-fileupload');

const { fileUpLoad } = require("../controllers/uploads");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.use(expressfileUpload());

router.put("/:tipo/:id", validarJWT, fileUpLoad);

module.exports = router;
