var fetch = require('node-fetch');
var _ = require('lodash');

module.exports = {
    loadData: function() {
        return fetch('http://agl-developer-test.azurewebsites.net/people.json')
            .then(function(res) {
                return res.json();
            });
    },
    getOwnersGenders: function(data) {
        return _.uniq(_.map(data, function(obj) {
            return obj.gender;
        }));
    },
    getCatsByOwnersGender: function(data, gender) {
        return _.sortBy(
            _.flatten(
                _.filter(data, function(obj) {
                    return obj.gender == gender;
                }).map(function(obj) {
                    return _.filter(obj.pets, function(obj) {
                        return obj.type == "Cat";
                    }).map(function(obj) {
                        return obj.name;
                    });
                })
            )
        );
    },
    getTemplateData: function(data) {
        var that = this;

        return _.map(that.getOwnersGenders(data), function(gender) {
            var cats = _.map(that.getCatsByOwnersGender(data,gender), function(obj) {
                return obj;
            });
            return {
                'gender': gender,
                'cats': cats
             }
        });
    }
}
