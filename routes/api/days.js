'use strict';
var Promise = require('bluebird');
var router = require('express').Router();

var db = require('../../models');
var Hotel = db.model('hotel');
var Restaurant = db.model('restaurant');
var Activity = db.model('activity');
var Place = db.model('place');
var Day = db.model('day');

// Example:
//
// Use Fetch (built in browser API):
//
//   fetch('/api').then(res => json()).then(doSomethingWithIt)
//
// Use jQuery's $.get:
//
//   $.get('/api').then(doSomethingWithIt)
//
// Or:
//
//   $.ajax('/api', {method: 'get'}).then(doSomethingWithIt)
//
router.get('/', (req, res, next) =>
    Promise.props({
        hotels: Hotel.findAll({ include: [Place] }),
        restaurants: Restaurant.findAll({ include: [Place] }),
        activities: Activity.findAll({ include: [Place] })
    })
        .then(data => res.json(data))
        .catch(next)
)

// Use Fetch (built in browser API):
//
//   IDK, look it up on MDN?
//
// Use jQuery's $.post:
//
//   $.post('//echo', {hello: 'world'}).then(doSomethingWithIt)
router.post('/echo', (req, res) => res.json(req.body))

router.post('/day',
    (req, res, next) =>
    // console.log(req.body)
        Day.create(req.body)
            .then(day => res.json(day))
            .catch(next))

module.exports = router;
