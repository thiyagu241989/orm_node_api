// permission.route.js

const express = require('express');
const app = express();
const publishRoutes = express.Router();


// Require permission model in our routes module
let Publish = require('../models/Publish');
let Book = require('../models/Book');

// Defined store route
publishRoutes.route('/add').post(async function(req, res) {

    let isSlotExists = await Publish.findOne({ pubId: req.body.pubId }).lean();

    if (!isSlotExists) {

        let saveSatus = new Publish(req.body);
        saveSatus.save().then(saveSatus => {
                res.status(200).json({
                    status: 'success',
                    message: 'Publish has been added successfully'
                });
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });

    } else {

        res.status(422).send({
            status: 'fail',
            message: 'Publish already exists'
        })
    }


});

// Defined get data(index or listing) route
publishRoutes.route('/').get(function(req, res) {
    Publish.find(function(err, appointmentslots) {
        if (err) {
            console.log(err);
        } else {
            return res.status(200).json(appointmentslots);
        }
    });
});


module.exports = publishRoutes;