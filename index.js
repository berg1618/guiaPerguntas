const express = require('express');
const app = express();

app.set('view engine', 'ejs');
//estou dizendo para o express que minha view engine é o ejs
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/perguntar', (req, res) => {
	res.render('perguntar')
});

app.listen(8080,() => {
	console.log('app running');
})