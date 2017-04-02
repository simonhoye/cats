var express = require('express');
var app = express();
var router = express.Router();
var assert = require('assert');
var expect = require('expect');
var fetch = require('node-fetch');
var _ = require('lodash');

var lib = require('../lib');

var mockData = [
    {
        "name":"Bob",
        "gender":"Male",
        "age":23,
        "pets":[
            {
                "name":"Garfield",
                "type":"Cat"
            },
            {
                "name":"Fido",
                "type":"Dog"
            }
        ]
    },
    {
        "name":"Jennifer",
        "gender":"Female",
        "age":18,
        "pets":[
            {
                "name":"Garfield",
                "type":"Cat"
            }
        ]
    },
    {
        "name":"Steve",
        "gender":"Male",
        "age":45,
        "pets":null
    },
    {
        "name":"Fred",
        "gender":"Male",
        "age":40,
        "pets":[
            {
                "name":"Tom",
                "type":"Cat"
            },
            {
                "name":"Max",
                "type":"Cat"
            },
            {
                "name":"Sam",
                "type":"Dog"
            },
            {
                "name":"Jim",
                "type":"Cat"
            }
        ]
    },
    {
        "name":"Samantha",
        "gender":"Female",
        "age":40,
        "pets":[
            {
                "name":"Tabby",
                "type":"Cat"
            }
        ]
    },
    {
        "name":"Alice",
        "gender":"Female",
        "age":64,
        "pets":[
            {
                "name":"Simba",
                "type":"Cat"
            },
            {
                "name":"Nemo",
                "type":"Fish"
            }
        ]
    }
];

var mockTemplateData = [
    {
        "gender": "Male",
        "cats": [
            "Garfield",
            "Jim",
            "Max",
            "Tom"
        ]
    },
    {
        "gender": "Female",
        "cats": [
            "Garfield",
            "Simba",
            "Tabby"
        ]
    }
];

var ownersGenders = ['Male', 'Female'];
var	maleCats = ['Garfield', 'Jim', 'Max', 'Tom'];
var femaleCats = ['Garfield', 'Simba', 'Tabby'];

describe('Cat tests', function() {

    it("should return an array", function(done) {
        lib.loadData().then(function(data,done) {
            expect(_.isArray(data)).toBe(true);
        }).then(done, done);
    });

    it("should return array of owners genders", function(done) {
        expect(lib.getOwnersGenders(mockData)).toEqual(ownersGenders);
        done();
    });

	it("should return alphabetically ordered list of males", function(done) {
		expect(lib.getCatsByOwnersGender(mockData, "Male")).toEqual(maleCats);
        done();
	});

	it("should return alphabetically ordered list of females", function(done) {
		expect(lib.getCatsByOwnersGender(mockData, "Female")).toEqual(femaleCats);
        done();
	});

    it("should return an array with of alphabetically sorted cats grouped by owners gender", function(done) {
        expect(lib.getTemplateData(mockData)).toEqual(mockTemplateData);
        done();
    })

});
