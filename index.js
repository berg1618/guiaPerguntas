const express = require('express');
const app = express();

app.set('view engine', 'ejs');
//estou dizendo para o express que minha view engine é o ejs

app.get('/', (req, res) => {
	res.send('welcome to my page!');
});

app.listen(8080,() => {
	console.log('app running');
})