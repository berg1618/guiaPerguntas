const Sequelize = require('sequelize');
const connection = require('./database');

const Pergunta = connection.define('perguntas', {
	titulo:{
		type: Sequelize.STRING,
		allowNull: false
	},
	descricao:{
		type: Sequelize.TEXT,
		allowNull: false
	}
});

Pergunta.sync({force: false})
	.then(() => {
		console.log('table created!');
	})
	.catch((error) => {
		console.log('couldn\'t create a table');
	})

module.exports = Pergunta;