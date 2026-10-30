const { verificarCredenciais } = require("../services/credenciais");
const { gerarToken, revogarToken } = require("../services/tokens");
const Usuario = require("../models/Usuario");

async function fazerLogin(req, res) {
    try {
        const { email, senha } = req.body;

        const usuario = await verificarCredenciais(email, senha);

        const token = gerarToken(usuario.id);

        return res.status(200).json({
            mensagem: "Login realizado com sucesso!",
            token,
            tipo: "Bearer",
            expiracao: "2 minutos"
        });

    } catch (erro) {
        return res.status(erro.status || 500).json({
            erro: erro.status
                ? erro.message
                : "Não foi possível realizar o login."
        });
    }
}

function fazerLogout(req, res) {
    const removido = revogarToken(req.token);

    if (!removido) {
        return res.status(401).json({
            erro: "Token não encontrado."
        });
    }

    return res.status(200).json({
        mensagem: "Logout realizado com sucesso!"
    });
}

async function consultarUsuario(req, res) {
    try {
        const usuario = await Usuario.findByPk(req.usuarioId);

        if (!usuario) {
            return res.status(404).json({
                erro: "Usuário não encontrado."
            });
        }

        return res.status(200).json({
            id: usuario.id,
            email: usuario.email
        });

    } catch (erro) {
        return res.status(500).json({
            erro: "Não foi possível consultar o usuário."
        });
    }
}

module.exports = {
    fazerLogin,
    fazerLogout,
    consultarUsuario
};
