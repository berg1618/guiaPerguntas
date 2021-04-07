const express = require('express');
const app = express();
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
//database

connection.authenticate()
	.then(() => {
		console.log('sucessful connection!');
	})
	.catch((msgErro) => {
		console.log(msgErro);
	})
app.set('view engine', 'ejs');
//estou dizendo para o express que minha view engine é o ejs
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));
//decodifica os dados do form para ser usado no js
app.use(express.json());
//permite a leitura de json

app.get('/', (req, res) => {
	Pergunta.findAll({raw: true}).then(perguntas => {
		res.render('index',{
			perguntas: perguntas
		});
	});
});

app.get('/perguntar', (req, res) => {
	res.render('perguntar');
});

app.post('/salvarpergunta', (req, res) => {

	const titulo = req.body.titulo;
	const descricao = req.body.descricao;

	Pergunta.create({
		titulo: titulo,
		descricao: descricao
	}).then(() => {
		res.redirect('/');
	});
});

app.listen(8080,() => {
	console.log('app running');
})