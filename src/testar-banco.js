const { sequelize, testarConexao } = require("./database");
const Usuario = require("./models/Usuario");

async function iniciarTeste() {
try {
await testarConexao();

    await Usuario.sync();

    console.log("Tabela usuarios pronta!");
} catch (erro) {
    console.error("Não foi possível preparar o banco.");
    process.exitCode = 1;
} finally {
    await sequelize.close();
}

}

iniciarTeste();
