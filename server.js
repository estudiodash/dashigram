var express = require('express');
var app = express();

app.se
app.use(express.static('public'));
app.use(express.static('css'));

app.get('/', function (req, res) {
    res.render('index')
})
app.get('/signup', function (req, res) {
    res.render('index')
})
app.get('/signin', function (req, res) {
    res.render('index')
})


app.listen(3000, function (err) {
    if(err) return console.log('Erro ver'), process.exit(1);
    console.log('Dashigram escuchando en el puerto 3000')

})