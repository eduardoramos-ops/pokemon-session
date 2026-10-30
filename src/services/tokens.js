const crypto = require("node:crypto");

const tokens = new Map();

const TEMPO_EXPIRACAO = 2 * 60 * 1000;

function gerarToken(usuarioId) {
    const token = crypto.randomBytes(32).toString("hex");

    const expiracao = Date.now() + TEMPO_EXPIRACAO;

    tokens.set(token, {
        usuarioId,
        expiracao
    });

    return token;
}

function validarToken(token) {
    const dados = tokens.get(token);

    if (!dados) {
        return null;
    }

    if (Date.now() >= dados.expiracao) {
        tokens.delete(token);
        return null;
    }

    return dados;
}

function revogarToken(token) {
    return tokens.delete(token);
}

module.exports = {
    gerarToken,
    validarToken,
    revogarToken
};
