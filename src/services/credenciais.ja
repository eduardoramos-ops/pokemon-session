const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");

async function verificarCredenciais(email, senha) {
    if (!email || !senha) {
        const erro = new Error("E-mail e senha são obrigatórios.");
        erro.status = 400;
        throw erro;
    }

    const emailNormalizado = email.trim().toLowerCase();

    const usuario = await Usuario.findOne({
        where: { email: emailNormalizado }
    });

    if (!usuario) {
        const erro = new Error("E-mail ou senha incorretos.");
        erro.status = 401;
        throw erro;
    }

    const senhaValida = await bcrypt.compare(
        senha,
        usuario.senhaHash
    );

    if (!senhaValida) {
        const erro = new Error("E-mail ou senha incorretos.");
        erro.status = 401;
        throw erro;
    }

    return usuario;
}

module.exports = { verificarCredenciais };
