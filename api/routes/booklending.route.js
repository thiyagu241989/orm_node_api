// permission.route.js

const express = require('express');
const app = express();
const booklendingRoutes = express.Router();


// Require permission model in our routes module
let Booklending = require('../models/Booklending');

// Defined store route
booklendingRoutes.route('/add').post(async function(req, res) {

    let isSlotExists = await Booklending.findOne({ bklendId: req.body.bklendId, book: req.body.book }).lean()


    if (!isSlotExists) {

        let saveSatus = new Booklending(req.body);
        saveSatus.save()
            .then(saveSatus => {
                res.status(200).send({
                    status: 'success',
                    message: 'Booklending has been added successfully'
                });
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });

    } else {

        res.status(422).send({
            status: 'fail',
            message: 'lend already'
        })
    }


});

// Defined get data(index or listing) route
booklendingRoutes.route('/').get(function(req, res) {
    Booklending.find(function(err, appointmentslots) {
        if (err) {
            console.log(err);
        } else {
            return res.status(200).json(appointmentslots);
        }
    });
});


module.exports = booklendingRoutes;