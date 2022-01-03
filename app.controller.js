const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');
const firebase = require('firebase/compat/app')
require('firebase/compat/firestore')

module.exports = (app) => {
    app.use('/', router);
};

router.get('/home', (req, res) => {
    res.json({
        message: "home"
    })
})

router.post('/mail', async (req, res) => {
    const { user, pass, to, subject = 'Sending Email using Node.js', text, html = '' } = req.body;

    var transport = nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass }
    });

    const mailData = {
        from: user, to, subject, text, html,
    };

    try {
        let info = await transport.sendMail(mailData);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.status(200).json({
            message: "Mail send",
            message_id: info
        })
    } catch (err) {
        res.status(500).json({
            message: "Mail fail",
            message_err: err
        })
    }
})

var fire = firebase.initializeApp({
    apiKey: "AIzaSyC3alM6CzmTWBwpIeBQr8jIdrB-vdIq6iU",
    authDomain: "klambimu-id.firebaseapp.com",
    databaseURL: "https://klambimu-id-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "klambimu-id",
    storageBucket: "klambimu-id.appspot.com",
    messagingSenderId: "886549110355",
    appId: "1:886549110355:web:bb6e9bec160ec92881f0a6",
    measurementId: "G-LLB0TZHJR3"
});

router.post('/dropbox', async (req, res) => {
    const { current_weight, dropbox_id } = req.body;
    var db = fire.firestore()

    if (current_weight == null || dropbox_id == null) {
        res.status(500).json({
            status: false,
            message: "current_weight / dropbox_id tidak boleh kosong",
        })
    } else {
        try {
            db.settings({
                timestampsInSnapshots: true
            })
            db.collection('dropbox_item').add({
                current_weight,
                dropbox_id,
                dropbox: db.collection('dropbox').doc(dropbox_id),
                createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                status: 0
            })

            res.status(200).json({
                status: true,
                message: "Data Created",
                message_id: {
                    current_weight,
                    dropbox_id,
                    createdAt: Date(),
                }
            })
        } catch (err) {
            res.status(500).json({
                status: false,
                message: "Data error Created",
                message_err: err
            })
        }
    }

})
