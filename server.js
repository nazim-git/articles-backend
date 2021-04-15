var express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const appRoute = express.Router();
const Employee = require('./schemas/Employee');
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
    let employee = new Employee(reqs);
    employee.save()
        .then(employee => {
            res.status(200).json(employee);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.route('/Employees').get(function (req, res) {
    Employee.find({}, function (err, employees) {
        if (!err)
            res.status(200).json(employees);
        else
            res.status(400).json(err);
    });
});

app.route('/employee/:id').get(function (req, res) {
    Employee.findOne(req.param.id, function (err, employee) {
        if (!err)
            res.json(employee);
        else
            res.json(err);
    });
});

app.route('/updateEmployee/:employee_id').post(function (req, res) {
    Employee.findOneAndUpdate({ _id: req.params.employee_id }, { $set: req.body })
        .then(_ => res.status(200).json("Employee Update sucessfull"))
        .catch(err => res.status(400).send(err))
});

app.route('/deleteEmployee/:employee_id').delete(function (req, res) {
    Employee.remove({ _id: req.params.employee_id })
        .then(_ => res.status(200).json("Employee Delete sucessfull"))
        .catch(err => res.status(400).send(err))
});

app.listen(process.env.PORT || 5000)
exports = module.exports = app;