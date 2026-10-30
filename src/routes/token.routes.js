const express = require("express");
const {
    cadastrarUsuario
} = require("../controllers/auth.controller");

const {
    fazerLogin,
    fazerLogout,
    consultarUsuario
} = require("../controllers/token.controller");

const { exigirToken } = require("../middlewares/autenticacao-token");

const router = express.Router();

router.post("/cadastro", cadastrarUsuario);
router.post("/login", fazerLogin);
router.post("/logout", exigirToken, fazerLogout);
router.get("/me", exigirToken, consultarUsuario);

module.exports = router;
