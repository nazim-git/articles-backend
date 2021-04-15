var express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const appRoute = express.Router();
const Article = require('./schemas/Article');
var app = express();
app.use(cors());
app.use(bodyParser.json());
appRoute.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
mongoose.connect(process.env.mongooseURI,
    { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

app.route('/').get(function (req, res) {
    res.json('Express server working without any problem');
});

app.route('/addEmployee').post(function (req, res) {
    let reqs = req.body;
    let article = new Article(reqs);
    article.save()
        .then(article => {
            res.status(200).json(article);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.route('/Employees').get(function (req, res) {
    Article.find({}, function (err, articles) {
        if (!err)
            res.status(200).json(articles);
        else
            res.status(400).json(err);
    });
});

app.route('/article/:id').get(function (req, res) {
    Article.findOne(req.param.id, function (err, article) {
        if (!err)
            res.json(article);
        else
            res.json(err);
    });
});

app.route('/updateEmployee/:article_id').post(function (req, res) {
    Article.findOneAndUpdate({ _id: req.params.article_id }, { $set: req.body })
        .then(_ => res.status(200).json("Atricle Update sucessfull"))
        .catch(err => res.status(400).send(err))
});

app.route('/deleteEmployee/:article_id').delete(function (req, res) {
    Article.remove({ _id: req.params.article_id })
        .then(_ => res.status(200).json("Atricle Delete sucessfull"))
        .catch(err => res.status(400).send(err))
});

app.listen(process.env.PORT || 5000)
exports = module.exports = app;