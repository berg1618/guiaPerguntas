const express = require('express');
const app = express();
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');
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
	Pergunta.findAll({raw: true, order:[
			['id', 'DESC'] //ASC = crescente || DESC = descrescente
		]}).then(perguntas => {
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

app.get('/pergunta/:id', (req, res) => {
	const id = req.params.id; 
	Pergunta.findOne({
		where: {id : id}
	}).then(pergunta => {
		if(pergunta != undefined){ //pergunta achada
			res.render('pergunta', {
				pergunta: pergunta,
			});
		}else{//não encontrada
			res.redirect('/');
		}
	})
});

app.post('/responder', (req, res) => {
	const corpo = req.body.corpo;
	const perguntaId = req.body.pergunta;
	Resposta.create({
		corpo: corpo,
		perguntaId: perguntaId
	}).then(() => {
		res.redirect('/pergunta/'+perguntaId);//res.redirect('/pergunta/5')
	});
})

app.listen(8080,() => {
	console.log('app running');
})