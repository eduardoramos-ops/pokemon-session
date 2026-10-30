require("dotenv").config();

const express = require("express");
const session = require("express-session");

const authRoutes = require("./routes/auth.routes");
const { buscarPokemon } = require("./services/pokeapi");
const { exigirSessao } = require("./middlewares/autenticacao");

const app = express();

app.use(express.json());

// Configuração das sessões.
app.use(session({
    name: "pokemon.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
        maxAge: 2 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: false
    }
}));

app.use("/auth", authRoutes);

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Pokemon Session funcionando!"
    });
});

// A autenticação acontece antes da consulta à PokéAPI.
app.get("/pokemon/:nome", exigirSessao, async (req, res) => {
    try {
        const nome = req.params.nome;

        const pokemon = await buscarPokemon(nome);

        res.status(200).json(pokemon);

    } catch (erro) {
        res.status(erro.status || 502).json({
            erro: erro.message
        });
    }
});

const PORT = 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
