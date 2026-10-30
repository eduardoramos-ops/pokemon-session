require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
process.env.DATABASE_URL,
{
dialect: "postgres",
logging: false
}
);

async function testarConexao() {
try {
await sequelize.authenticate();

    console.log("Conexão com PostgreSQL estabelecida!");
} catch (erro) {
    console.error("Erro ao conectar ao PostgreSQL:");
    console.error(erro.message);

    throw erro;
}

}

module.exports = { sequelize, testarConexao};
