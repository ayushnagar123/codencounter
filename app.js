const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('hbs')
const app = express()

var port = process.env.PORT || 3000;

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views')
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => {
    res.render('index')
})


app.get('/registration', (req, res) => {
    res.render('registration')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/beaches', (req, res) => {
    res.render('beaches')
})

app.get('/heritage', (req, res) => {
    res.render('heritage')
})

app.get('/hill', (req, res) => {
    res.render('hill')
})

app.get('/leisure', (req, res) => {
    res.render('leisure')
})

app.get('/wildlife', (req, res) => {
    res.render('wildlife')
})

app.get('/romantic', (req, res) => {
    res.render('romantic')
})

app.get('/vac', (req, res) => {
    res.render('vac')
})

app.post('/', (req, res) => {
    var email = req.body.email
    res.send(email)

})

app.post('/signup', (req, res) => {

})

app.listen(port)