const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('hbs')
const app = express()

var port = process.env.PORT || 3000;

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

app.use(bodyParser.json())

app.use(express.static(__dirname+ '/public'));

app.set('views',__dirname+'/views')
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

app.get('/',(req,res)=>{
    res.render('index',{
        body:'index'
    })
})

app.get('/login',(req,res)=>{
    res.render('login',{
        body:'login'
    })
})

app.get('/signup',(req,res)=>{
    res.render('signup',{
        body:'signup'
    })
})

app.post('/',(req,res)=>{
    var email = req.body.email
    res.send(email)

})

app.post('/signup',(req,res)=>{

})

app.listen(port)