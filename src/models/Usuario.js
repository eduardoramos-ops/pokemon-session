const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");

const Usuario = sequelize.define(
"Usuario",
{
id: {
type: DataTypes.INTEGER,
primaryKey: true,
autoIncrement: true
},

    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    senhaHash: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "senha_hash"
    }
},
{
    tableName: "usuarios",
    timestamps: true,
    createdAt: "criado_em",
    updatedAt: "atualizado_em"
}

);

module.exports = Usuario;
