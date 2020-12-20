// permission.route.js

const express = require('express');
const app = express();
const bookRoutes = express.Router();
// const asyncForEach = require('async-await-foreach');
const asyncForEach = require('array-foreach-async');


// Require permission model in our routes module
let Book = require('../models/Book');
let Author = require('../models/Author');
let Categories = require('../models/Categories');
let Booklending = require('../models/Booklending');

// Defined store route
bookRoutes.route('/add').post(async function(req, res) {

    let isSlotExists = await Book.findOne({ bkId: req.body.bkId, 'author': { $in: req.body.author } }).lean()


    if (!isSlotExists) {

        let saveSatus = new Book(req.body);
        saveSatus.save()
            .then(saveSatus => {
                res.status(200).json({
                    status: 'success',
                    message: 'Book has been added successfully'
                });
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });

    } else {

        res.status(422).send({
            status: 'fail',
            message: 'book already exists'
        })
    }


});

// Defined get data(index or listing) route
bookRoutes.route('/').get(async function(req, res) {
    // Book.find(function(err, appointmentslots) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         return res.status(200).json(appointmentslots);
    //     }
    // });

    try {
        let books = await Book.find().lean();
        return res.status(200).json(books);
    } catch (err) {
        return res.status(200).json(err);
    }
});

bookRoutes.route('/bookrender2').get(async function(req, res) {
    Book.find(async function(err, books) {
        if (err) {
            console.log(err);
        } else {
            // return res.status(200).json(books);
            await books.forEachAsync(async _book => {
                _book['category'] = await Categories.findOne({ catId: _book.category }).lean()
                _book['author'] = await Author.find({ "authId": { $in: _book.author } }).lean()
                _book['booklending'] = await Booklending.find({ book: _book.bkId }).lean()
                bookFinalData.push(_book)
            })

            res.send({ status: "success", data: bookFinalData })
        }
    });
});

bookRoutes.get('/bookrender', async(req, res, next) => {
    try {
        let books = await Book.find().lean()
        let bookFinalData = []

        await books.forEachAsync(async _book => {
            _book['category'] = await Categories.findOne({ catId: _book.category }).lean()
            _book['author'] = await Author.find({ "authId": { $in: _book.author } }).lean()
            _book['booklending'] = await Booklending.find({ book: _book.bkId }).lean()
            bookFinalData.push(_book)
        })

        res.send({ status: "success", data: bookFinalData })

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'error Occurred' })
    }
})

module.exports = bookRoutes;