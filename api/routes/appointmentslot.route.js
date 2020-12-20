// permission.route.js

const express = require('express');
const app = express();
const appointmentslotRoutes = express.Router();


// Require permission model in our routes module
let Appointmentslot = require('../models/Appointmentslot');

// Defined store route
appointmentslotRoutes.route('/add').post(async function(req, res) {
    // 'slot': { $in: req.body.slot }
    let isSlotExists = await Appointmentslot.findOne({ appointmentDate: req.body.appointmentDate, 'slot': { $in: req.body.slot } }).lean()


    if (!isSlotExists) {
        console.log('new save', req.body);
        let saveSatus = new Appointmentslot(req.body);
        // let savedData = await saveSatus.save();
        // console.log('new save', savedData);
        // res.status(200).json({
        //     status: 'success',
        //     message: 'Appointmentslot has been added successfully'
        // });
        saveSatus.save()
            .then(saveSatus => {
                res.status(200).json({
                    status: 'success',
                    message: 'Appointmentslot has been added successfully'
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
appointmentslotRoutes.route('/').get(function(req, res) {
    Appointmentslot.find(function(err, appointmentslots) {
        if (err) {
            console.log(err);
        } else {
            return res.status(200).json(appointmentslots);
        }
    });
});


module.exports = appointmentslotRoutes;