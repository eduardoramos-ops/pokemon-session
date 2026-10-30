require("dotenv").config();

const express = require("express");

const tokenRoutes = require("./routes/token.routes");
const { buscarPokemon } = require("./services/pokeapi");
const { exigirToken } = require("./middlewares/autenticacao-token");

const app = express();

app.use(express.json());

app.use("/auth", tokenRoutes);

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Servidor de token funcionando!"
    });
});

app.get("/pokemon/:nome", exigirToken, async (req, res) => {
    try {
        const pokemon = await buscarPokemon(req.params.nome);

        return res.status(200).json(pokemon);

    } catch (erro) {
        return res.status(erro.status || 502).json({
            erro: erro.message
        });
    }
});

const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor de token iniciado na porta ${PORT}`);
});
