const { validarToken } = require("../services/tokens");

function exigirToken(req, res, next) {
    const autorizacao = req.headers.authorization;

    if (!autorizacao) {
        return res.status(401).json({
            erro: "Token de acesso não informado."
        });
    }

    const partes = autorizacao.split(" ");

    if (partes.length !== 2 || partes[0].toLowerCase() !== "bearer") {
        return res.status(401).json({
            erro: "Formato de autorização inválido."
        });
    }

    const token = partes[1];

    const dados = validarToken(token);

    if (!dados) {
        return res.status(401).json({
            erro: "Token inválido ou expirado."
        });
    }

    req.usuarioId = dados.usuarioId;
    req.token = token;

    next();
}

module.exports = { exigirToken };
