const BODYPARSER = require('body-parser'),
      EJS = require('ejs'),
      EXPRESS = require('express'),
      MONGOOSE = require('mongoose');

// Express
const APP = EXPRESS();

//-----------------------------------------------------//
// Body-Parser; EJS; Express
APP.use(BODYPARSER.urlencoded({extended: true}));
APP.use(BODYPARSER.json());
APP.set('view engine', 'ejs');
APP.use(EXPRESS.static('public'));
//-----------------------------------------------------//

//-----------------------------------------------------//
// Database Mongo
MONGOOSE.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true});
const DB = MONGOOSE.connection;

/**
 * Schema and Model for MongoDB
 */
let articleSchema = {
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
};
let Article = MONGOOSE.model('Article', articleSchema);
//-----------------------------------------------------//

//-----------------------------------------------------//
/**
 * All Articles
 */
APP.route('/articles')
    .get((req, res) => {
        Article.find({}, function(err, articles) {
            if (!err) {
                res.send(articles);
            } else {
                res.send(err);
            }
        });
    })
    .post((req, res) => {
        let obj = {
            title: req.body.title,
            content: req.body.content
        };

        const NEWARTICLE = new Article(obj);
        NEWARTICLE.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.send(obj);
            }
        });
    })
    .delete((req, res) => {
        Article.deleteMany({}, function(err) {
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully Deleted!");
            }
        });
    });

/**
 * Specific Article
 */
APP.route('/articles/:title')
    .get((req, res) => {
        let id = {title: req.params.title};

        Article.findOne(id, function(err, foundArticle) {
            if (err) {
                res.send(err);
            } else {
                res.send(foundArticle);
            }
        });
    })
    .put((req, res) => {
        let id = {title: req.params.title};
        let updates = {
            title: req.body.title,
            content: req.body.content
        };

        Article.update(id, updates, {overwrite: true}, function(err) {
            if (err) {
                res.send(err);
            } else {
                res.send(updates);
            }
        });
    })
    .patch((req, res) => {
        let id = {title: req.params.title};

        Article.update(id, {$set: req.body}, function(err, results) {
            if (err) {
                res.send(err);
            } else {
                res.send(results);
            }
        });
    })
    .delete((req, res) => {
        let id = {title: req.params.title};

        Article.deleteOne(id, function(err) {
            if (err) {
                res.send(err);
            } else {
                res.send("Item deleted!");
            }
        });
    });
//-----------------------------------------------------//

//-----------------------------------------------------//
const LISTENPORT = 3000;
APP.listen(LISTENPORT, () => {
    console.log('Listening on port ' + LISTENPORT);
});
