function exigirSessao(req, res, next) {
    if (!req.session || !req.session.usuarioId) {
        return res.status(401).json({
            erro: "Não autenticado. Faça login novamente."
        });
    }

    next();
}

module.exports = { exigirSessao };
