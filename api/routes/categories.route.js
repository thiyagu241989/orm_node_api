// permission.route.js

const express = require('express');
const app = express();
const categoriesRoutes = express.Router();


// Require permission model in our routes module
let Categories = require('../models/Categories');

// Defined store route
categoriesRoutes.route('/add').post(async function(req, res) {

    let isSlotExists = await Categories.findOne({ catId: req.body.catId }).lean()


    if (!isSlotExists) {

        let saveSatus = new Categories(req.body);
        saveSatus.save()
            .then(saveSatus => {
                res.status(200).json({
                    status: 'success',
                    message: 'Categories has been added successfully'
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
categoriesRoutes.route('/').get(function(req, res) {
    Categories.find(function(err, appointmentslots) {
        if (err) {
            console.log(err);
        } else {
            return res.status(200).json(appointmentslots);
        }
    });
});


module.exports = categoriesRoutes;