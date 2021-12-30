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

router.post('/mail', async (req, res) => {
    const { to, subject = 'Sending Email using Node.js', text, html = '' } = req.body;

    const mailData = {
        from: 'pitungs060@gmail.com', to, subject, text, html,
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
