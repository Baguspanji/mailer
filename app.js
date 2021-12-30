const express = require("express");
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app.controller')(app)

app.get('/', (req, res) => {
    res.json({
        message: "ok"
    })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});