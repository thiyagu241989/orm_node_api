// permission.route.js

const express = require('express');
const app = express();
const contactInfoRoutes = express.Router();


// Require permission model in our routes module
let Contactinfo = require('../models/Contactinfo');

// Defined store route
contactInfoRoutes.route('/add').post(async function(req, res) {

    let isSlotExists = await Contactinfo.findOne({ appointmentDate: req.body.appointmentDate, 'slot': { $in: req.body.slot } }).lean()


    if (!isSlotExists) {

        let saveSatus = new Contactinfo(req.body);
        saveSatus.save()
            .then(saveSatus => {
                res.status(200).json({
                    status: 'success',
                    message: 'Contactinfo has been added successfully'
                });
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });

    } else {

        res.status(422).send({
            status: 'fail',
            message: 'Slot already exists in this date'
        })
    }


});

// Defined get data(index or listing) route
contactInfoRoutes.route('/').get(function(req, res) {
    Contactinfo.find(function(err, appointmentslots) {
        if (err) {
            console.log(err);
        } else {
            return res.status(200).json(appointmentslots);
        }
    });
});


module.exports = contactInfoRoutes;