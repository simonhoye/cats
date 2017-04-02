var express = require('express');
var app = express();
var _ = require('lodash');
var lib = require('./lib');

app.set('view engine', 'pug')

app.get('/', (req,res) => {
    lib.loadData().then(function(data) {
        res.render('index', { title: 'CatsApp', data: lib.getTemplateData(data)});
    })
});

app.listen(3000, () => {
    console.log('App running on port 3000');
})
