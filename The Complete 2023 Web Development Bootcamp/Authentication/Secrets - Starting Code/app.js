require('dotenv').config();

const bodyParser = require('body-parser'),
      ejs = require('ejs'),
      express = require('express'),
      mongoose = require('mongoose'),
      findOrCreate = require('mongoose-findorcreate'),
      passport = require('passport'),
      passportLocalMongoose = require('passport-local-mongoose'),
      session = require('express-session'),
      GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

/**
 * USE in Express
 */
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
// For this order
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());

/**
 * Mongoose Connection, Schema and Model
 */
mongoose.connect(
    'mongodb://localhost:27017/userDB',
    {useNewUrlParser: true, useUnifiedTopology: true}
);
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema ({email: String, password: String, googleId: String, secret: String});

// passportLocalMongoose (Hash and Salt)
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth20/v3/userinfo"
  },

  function(token, tokenSecret, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
  }
));

/**
 * Route
 */
app.get('/', (req, res) => {
    res.render("home");
});

app.get('/auth/google',
    passport.authenticate('google', {scope: ['profile']})
);

app.get('/auth/google/secrets',
    passport.authenticate('google', {failureRedirect: '/login'}),
    function(req, res) {
        res.redirect('/');
    }
);

app.get('/login', (req, res) => {
    res.render("login");
});

app.post('/login', (req, res) => {

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function(err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate('local')(req, res, function() {
                res.redirect('/secrets');
            });
        }
    });

});

app.get('/register', (req, res) => {
    res.render("register");
});

app.post('/register', (req, res) => {

    User.register(
        {username: req.body.username},
        req.body.password,
        function(err, user) {
            if (err) {
                console.log(err);
                res.redirect('/register');
            } else {
                passport.authenticate('local')(req, res, function() {
                    res.redirect('/secrets');
                });
            }
        }
    );
});

app.get('/secrets', (req, res) => {
    User.find(
        {"secret": {$ne: null}},
        function(err, foundUsers) {
            if (err) {
                console.log(err);
            } else {
                if (foundUsers) {
                    res.render("secrets", {userWithSecrets: foundUsers});
                }
            }
        }
    );
});

app.get('/submit', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('submit');
    } else {
        res.redirect('/login');
    }
});

app.post('/submit', (req, res) => {
    const submittedSecret = req.body.secret;
    const user = req.user._id;

    User.findById(user, function(err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            foundUser.secret = submittedSecret;
            foundUser.save(function() {
                res.redirect('/secrets');
            });
        }
    });
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
/**
 * Listen
 */
const LISTPORT = 3000;
app.listen(LISTPORT, () => {
    console.log('Listing in port ' + LISTPORT);
});
