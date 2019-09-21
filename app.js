if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }

const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('hbs')
const app = express()
const mysql = require('mysql')
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const nodemailer = require('nodemailer')
const nhbs = require('nodemailer-express-handlebars')
var port = process.env.PORT || 3000;
var sessionStore = new MySQLStore({
    host:'localhost',
    database: 'naggaro',
    user: 'ayush',
    password: 'ayush'
});
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

app.post('/',(req,res)=>{
    var email = req.body.email
    var pass= req.body.password
    var query='select * from registration where email="'+email+'" and password="'+pass+'"';
    conn.query(query,(err,result)=>{
        if(err) throw err;
        console.log(result)
        if(result){
            res.redirect('/login')
        }
        else{
            res.redirect('/');
        }
    })
})
 
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

app.post('/signup',(req,res)=>{
    var name = req.body.name;
    var age = req.body.age;
    var email = req.body.email;
    var phone = req.body.contact;
    var pass = req.body.password;
    var gen = req.body.gender
    var query =`INSERT INTO registration(name,age,email,contact,password,gender) VALUES(
        '${name}',
        ${age},
        '${email}',
        '${phone}',
        '${pass}',
        '${gen}'
    )`;
    conn.query(
        query,function(err,results){
            if(err){
                console.log(err)
                res.redirect('/registration')
            }
            else{
                console.log(results)
                res.render('index',{
                    name:name
                })
            }
        })
})

app.get('/city/:id',(req,res)=>{
    var id = req.params.id;
    var query=`select * from INFO where City ='${id}' or PLACES='${id}';`;
    var city;
    conn.query(query,function(err,cit){
        if(err){
            throw err;
        }
        else{ 
            city=cit;
        }
    })
    var query=`select heading from INFO where City ='${id}' or PLACES='${id}';`;
    conn.query(
        query,function(err,explore){
            if(err){
                console.log(err)
                res.redirect('/registration')
            }
            else{
                query=`select food from INFO where City ='${id}' or PLACES='${id}';`;
                conn.query(query,function(err,food){
                    if(err){
                        console.log(err)
                        res.redirect('/registration')
                    }
                    else{
                        query=`select culture from INFO where City ='${id}' or PLACES='${id}';`;
                        conn.query(query,function(err,culture){
                            if(err){
                                console.log(err)
                                res.redirect('/registration')
                            }
                            else{
                                query=`select places_v from INFO where City ='${id}' or PLACES='${id}';`;
                                conn.query(query,function(err,places){
                                    if(err){
                                        console.log(err)
                                        res.redirect('/registration')
                                    }
                                    else{
                                        res.render('city',{
                                            city:id,
                                            explore:explore,
                                            food:food,
                                            culture:culture,
                                            places:places
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
})

app.post('/mailme',(req,res)=>{
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL1,
            pass:process.env.PASS
        }
    });

  //step 2
  let mailOptions = {
      from:process.env.EMAIL1,
      to:process.env.EMAIL2,
      subject:'test mail',
      text: 'Query sent from '+ req.body.Name+' '+ req.body.Email + '\n'+req.body.Message
  };

  //step 3
  transporter.sendMail(mailOptions,function(err,data){
      if(err) console.log(err);
      else console.log('email sent');
  });
  res.redirect('/vac');
})

app.get('/logout',(req,res)=>{
    session.end();
})

app.listen(port,(err)=>{
    if(err) throw err;
    console.log('connected')
    conn = mysql.createConnection({
        host:'localhost',
        database: 'nagaro',
        user: 'ayush',
        password: 'ayush'
    })
    if(conn) console.log('db connected');
    if(!sessionStore) throw('seession error');
    console.log('session created')
})