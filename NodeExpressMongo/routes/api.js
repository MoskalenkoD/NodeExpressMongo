// Full Documentation - https://docs.turbo360.co
const express = require('express')
const router = express.Router();

const mongoose = require('mongoose');
const Profile = require('../models/Profile');

mongoose.connect('mongodb://localhost:27017/Mongo-Node', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, async function (err) {
    if (err) {
        console.log("Error", err);
        console.log('DB Connection Failed!');
    }
    console.log('DB Successfully Connected!');

    let profiles = await Profile.find();
    if (!profiles.length) {
        console.log(profiles.length);
        let data = require('../initial/profiles.json');

        (async function () {
            for (let item of data) {
                await Profile.create(item); //when fail its goes to catch
            }
        })();
    }

})

/*  This is a sample API route. */


router.get('/profile', (req, res) => {
    const query = req.query;

    Profile.find(query)
        .then(profiles => {
            res.json({
                confirmation: 'Success',
                data: profiles
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'Error',
                message: err.message
            })
        })
});

router.get('/profile/update', (req, res) => {
    const query = req.query;
    const profileId = query.id;
    delete query['id'];

    Profile.findByIdAndUpdate(profileId, query, {new: true})
        .then(profiles => {
            res.json({
                confirmation: 'Success',
                data: profiles
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'Error',
                message: err.message
            })
        })
});

router.get('/profile/remove/:id', (req, res) => {
    const id = req.params.id;

    Profile.findByIdAndDelete(id)
        .then(profiles => {
            res.json({
                confirmation: 'Success',
                data: profiles,
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'Error',
                message: err.message
            })
        })
})

router.get('/profile/:id', (req, res) => {
    const id = req.params.id;

    Profile.findById(id)
        .then(profile => {
            res.json({
                confirmation: 'Success',
                data: profile
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'Error',
                message: err.message
            })
        })
});

router.get('/profiles', async (req, res) => {

    const profiles = await Profile.find({})

    console.log('profiles', profiles);
    res.json({
        confirmation: 'Success',
        data: profiles
    })
})

router.post('/profile', (req, res) => {

    Profile.create(req.body)
        .then(profile => {
            res.json({
                confirmation: 'Success',
                data: profile
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'Fail',
                message: err.message
            })
        })
})


module.exports = router
