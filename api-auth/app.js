const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo-dbx:27017/sample-mongo1', {
    autoIndex: false,
    useNewUrlParser: true
});

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

// Routes
app.use('/users', require('./routes/userRouter'));
app.get('/test', (req, res, next) => {
    return res.json({
        msg: "ok"
    })
})

// Start server
const port = process.env.PORT || 3003;
app.listen(port);
console.log("Server jalan di port " + port);