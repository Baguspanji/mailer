const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    // host: "smtp.mailtrap.io",
    // port: 2525,
    // secure: false,
    service: 'gmail',
    auth: {
      user: "pitungs060@gmail.com",
      pass: "pcdvuhrqfspobyrv"
    }
  });

module.exports = (app) => {
    app.use('/', router);
};

router.get('/home', (req, res) => {
    res.json({
        message: "home"
    })
})

router.get('/mail', async (req, res) => {
    const mailData = {
        from: 'pitungs060@gmail.com',  // sender address
        to: 'bagusp0518@gmail.com',   // list of receivers
        subject: 'Sending Email using Node.js',
        text: 'Pesan coba!',
        html: '<b>Pesan coba! </b> <br> Ini hanya pesan coba saja <br/>',
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
