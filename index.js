const express = require('express');
const app = express();

app.set('view engine', 'ejs');
//estou dizendo para o express que minha view engine é o ejs
app.use(express.static('public'));

app.get('/:name/:lang', (req, res) => {
	const name = req.params.name;
	const lang = req.params.lang;
	const showMsg = true;
	const products = [
		{name: 'doritos', price: 3.14},
		{name: 'water', price: 5},
		{name: 'milk', price: 5.5}
	]

	res.render('index',{
		name: name,
		lang: lang,
		subs: 19,
		msg: showMsg,
		products: products
	});
});

app.listen(8080,() => {
	console.log('app running');
})