if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('hbs')
const app = express()
const mysql = require('mysql2')
const userRoutes = require('./users')
var weather = require('openweather-apis');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const nodemailer = require('nodemailer')
const nhbs = require('nodemailer-express-handlebars')
var port = process.env.PORT || 3000;
var sessionStore = new MySQLStore({
    host: 'localhost',
    database: 'NAGGARO',
    user: 'sid',
    password: 'sid'
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


app.get('/about', (req, res) => {
    res.render('about')
})

app.post('/login', (req, res) => {
    var email = req.body.email
    var pass = req.body.password
    var query = 'select * from registration where email="' + email + '" and password="' + pass + '"';
    conn.query(query, (err, result) => {
        if (err) throw err;
        if (result) {
            res.redirect('/')
        } else {
            res.redirect('/login');
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

app.post('/signup', (req, res) => {
    var name = req.body.name;
    var age = req.body.age;
    var email = req.body.email;
    var phone = req.body.contact;
    var pass = req.body.password;
    var gen = req.body.gender
    var query = `INSERT INTO registration(name,age,email,contact,password,gender) VALUES(
        '${name}',
        ${age},
        '${email}',
        '${phone}',
        '${pass}',
        '${gen}'
    )`;
    conn.query(
        query,
        function(err, results) {
            if (err) {
                console.log(err)
                res.redirect('/registration')
            } else {
                console.log(results)
                res.render('index', {
                    name: name
                })
            }
        })
})

app.use('/city', userRoutes);

app.post('/sendfeed',(req,res)=>{
    var city = req.body.city;
    var email = req.body.id;
    var feed = req.body.txt;
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // prints date & time in YYYY-MM-DD HH:MM:SS format
    var feed_date= year + "-" + month + "-" + date + " " + hours + ":" + minutes;

    var query = `insert into comments(USER_ID,CDATE,MESSAGE,City) values('${email}','${feed_date}','${feed}','${city}')`;
    conn.query(query,(err,result)=>{
        if(err) throw err;
        console.log('added');
        res.redirect('/');
    })

})

app.post('/mailme', (req, res) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL1,
            pass: process.env.PASS
        }
    });

    //step 2
    let mailOptions = {
        from: process.env.EMAIL1,
        to: process.env.EMAIL2,
        subject: 'test mail',
        text: 'Query sent from ' + req.body.Name + ' ' + req.body.Email + '\n' + req.body.Message
    };

    //step 3
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) console.log(err);
        else console.log('email sent');
    });
    /*
for demo and quick start place this code in your app.js or server.js
please run 'npm install puretext --save' in terminal
*/

    //     const puretext = require('puretext');
    //     require('request');

    //     let text = {
    //         // To Number is the number you will be sending the text to.
    //         toNumber: '+91-996-806-8330',
    //         // From number is the number you will buy from your admin dashboard
    //         fromNumber: '+919717504706',
    //         // Text Content
    //         smsBody: 'Sending SMS using Node.js',
    //         //Sign up for an account to get an API Token
    //         apiToken: 'testaccount'
    //     };

    //     puretext.send(text, function(err, response) {
    //         if (err) console.log(err);
    //         else console.log(response)
    //     })
    //     res.redirect('/vac');
})

app.get('/logout', (req, res) => {
    session.end();
})

app.listen(port, (err) => {
    if (err) throw err;
    console.log('connected')
    conn = mysql.createConnection({
        host: 'localhost',
        database: 'naggaro',
        user: 'ayush',
        password: 'ayush'
    })
    if (conn) console.log('db connected');
    if (!sessionStore) throw ('seession error');
    console.log('session created')
})