const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");
const { verificarCredenciais } = require("../services/credenciais");

async function cadastrarUsuario(req, res) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                erro: "E-mail e senha são obrigatórios."
            });
        }

        if (senha.length < 8) {
            return res.status(400).json({
                erro: "A senha deve ter pelo menos 8 caracteres."
            });
        }

        const emailNormalizado = email.trim().toLowerCase();

        const usuarioExistente = await Usuario.findOne({
            where: { email: emailNormalizado }
        });

        if (usuarioExistente) {
            return res.status(409).json({
                erro: "Este e-mail já está cadastrado."
            });
        }

        const senhaHash = await bcrypt.hash(senha, 12);

        const novoUsuario = await Usuario.create({
            email: emailNormalizado,
            senhaHash
        });

        return res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso!",
            usuario: {
                id: novoUsuario.id,
                email: novoUsuario.email
            }
        });

    } catch (erro) {
        console.error("Erro no cadastro:", erro.message);

        return res.status(500).json({
            erro: "Não foi possível cadastrar o usuário."
        });
    }
}

async function fazerLogin(req, res) {
    try {
        const { email, senha } = req.body;

        const usuario = await verificarCredenciais(email, senha);

        // Gera um novo identificador de sessão após a autenticação.
        await new Promise((resolve, reject) => {
            req.session.regenerate(erro => {
                if (erro) reject(erro);
                else resolve();
            });
        });

        // Guarda apenas o ID do usuário na sessão.
        req.session.usuarioId = usuario.id;

        // Garante que a sessão seja salva antes da resposta.
        await new Promise((resolve, reject) => {
            req.session.save(erro => {
                if (erro) reject(erro);
                else resolve();
            });
        });

        return res.status(200).json({
            mensagem: "Login realizado com sucesso!",
            usuario: {
                id: usuario.id,
                email: usuario.email
            }
        });

    } catch (erro) {
        console.error("Erro no login:", erro.message);

        return res.status(erro.status || 500).json({
            erro: erro.status
                ? erro.message
                : "Não foi possível realizar o login."
        });
    }
}

function fazerLogout(req, res) {
    req.session.destroy(erro => {
        if (erro) {
            return res.status(500).json({
                erro: "Não foi possível encerrar a sessão."
            });
        }

        res.clearCookie("pokemon.sid", {
            path: "/"
        });

        return res.status(200).json({
            mensagem: "Logout realizado com sucesso!"
        });
    });
}

module.exports = {
    cadastrarUsuario,
    fazerLogin,
    fazerLogout
};

