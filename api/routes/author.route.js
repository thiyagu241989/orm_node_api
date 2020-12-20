// permission.route.js

const express = require('express');
const app = express();
const authorRoutes = express.Router();


// Require permission model in our routes module
let Author = require('../models/Author');

// Defined store route
authorRoutes.route('/add').post(async function(req, res) {

    let isSlotExists = await Author.findOne({ authId: req.body.authId }).lean();

    // let isSlotExists = await Author.findOne({ authId: req.body.authId }).lean()


    if (!isSlotExists) {

        let saveSatus = new Author(req.body);
        saveSatus.save().then(saveSatus => {
                res.status(200).json({
                    status: 'success',
                    message: 'Author has been added successfully'
                });
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });

    } else {

        res.status(422).send({
            status: 'fail',
            message: 'Author already exists'
        })
    }


});

// Defined get data(index or listing) route
authorRoutes.route('/').get(function(req, res) {
    Author.find(function(err, appointmentslots) {
        if (err) {
            console.log(err);
        } else {
            return res.status(200).json(appointmentslots);
        }
    });
});


module.exports = authorRoutes;