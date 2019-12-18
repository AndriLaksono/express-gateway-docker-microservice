const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { JWT_SECRET } = require('../config/indexConfig');

signToken = user => {
    return JWT.sign({
        iss: "Andri",
        sub: user.id,
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1) // current date + 1 day
        // exp: new Date().setSeconds(new Date().getSeconds() + 30) // current date + 1 day || Buat testing
    }, JWT_SECRET);
}

module.exports = {
    signUp: async (req, res, next) => {
        const { name, email, password } = req.value.body;

        // check email if registered
        const foundUser = await User.findOne({ email : email });
        if (foundUser) {
            return res.status(403).json({ error: "Email sudah digunakan..." });
        }
        if (!name) {
            return res.status(403).json({ error: "Name tidak boleh kosong" });
        }

        // create new user
        const newUser = new User({
            method: "local",
            email,
            password,
            name: name
        });
        await newUser.save().then(response => {
            const token = signToken(newUser);
            // respond with token
            const data = {
                id: newUser._id,
                token: token,
                email: newUser.email,
                name: newUser.name,
                level: newUser.level,
                age: newUser.age ? newUser.age : null
            }
            res.status(200).json(data);
        }).catch(err => {
            res.json({ err })
        })

    },


    signIn: async (req, res, next) => {
        console.log(new Date().setSeconds(new Date().getSeconds() + 30))
        // generate token
        const token = await signToken(req.user);
        let testToken = token;
        let decoded = await JWT.verify(testToken, 'secretAuth');
        console.log(decoded);
        
        const data = {
            token: token,
            id: req.user._id,
            email: req.user.email,
            name: req.user.name,
            level: req.user.level,
            age: req.user.age ? req.user.age : null
        }
        res.status(200).json(data);
    },


    googleOAuth: async (req, res, next) => {
        // generate token
        const token = signToken(req.user);
        res.redirect('/dashboard?token='+token+'&_id='+req.user._id);
    },


    facebookOauth: async (req, res, next) => {
        // generate token
        const token = signToken(req.user);
        const data = {
            id: req.user._id,
            token: token,
            email: req.user.email,
            name: req.user.name,
            level: req.user.level,
            age: req.user.age ? req.user.age : null
        }
        res.status(200).json(data);
    },


    secret: async (req, res, next) => {
        res.json({ message: "okesip" });
    },

    getUserByGoogleCallback: async (req, res) => {
        const { id, token } = req.body;
        const foundUser = await User.findById(id);
        if (foundUser) {
            res.json({
                id: foundUser._id,
                token: token,
                email: foundUser.email,
                name: foundUser.name,
                level: foundUser.level,
                age: foundUser.age ? foundUser.age : null
            });
        }
    },

    getTesting: async (req, res) => {
        res.send({
            message: "oke"
        })
    }

}