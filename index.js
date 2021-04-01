const express = require('express');
const app = express();

app.set('view engine', 'ejs');
//estou dizendo para o express que minha view engine é o ejs
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));
//decodifica os dados do form para ser usado no js
app.use(express.json());
//permite a leitura de json

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/perguntar', (req, res) => {
	res.render('perguntar');
});

app.post('/salvarpergunta', (req, res) => {
	const titulo = req.body.titulo;
	const descricao = req.body.descricao;
	res.send(`form received! title:${titulo} description:${descricao}`);
});

app.listen(8080,() => {
	console.log('app running');
})