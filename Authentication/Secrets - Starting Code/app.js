require('dotenv').config();

const express = require('express'),
      bodyParser = require('body-parser'),
      ejs = require('ejs'),
      mongoose = require('mongoose'),
      md5 = require('md5');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser: true, useUnifiedTopology: true});
const userSchema = new mongoose.Schema ({
    email: String,
    password: String
});

/*const secret = process.env.SECRET;
userSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password']});*/

const User = mongoose.model('User', userSchema);


app.get('/', (req, res) => {
    res.render("home");
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.post('/login', (req, res) => {
    const user = req.body.username;
    const pass = md5(req.body.password);

    User.findOne({email: user}, function(err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if(foundUser) {
                if (foundUser.password === pass) {
                    res.render('secrets');
                }
            }
        }
    });
});

app.get('/register', (req, res) => {
    res.render("register");
});

app.post('/register', (req, res) => {
    const user = {
        email: req.body.username,
        password: md5(req.body.password)
    };

    new User(user).save(function(err) {
        if (err) {
            res.render(err);
        } else {
            res.render("secrets");
        }
    });
});

const LISTPORT = 3000;
app.listen(LISTPORT, () => {
    console.log('Listing in port ' + LISTPORT);
});
