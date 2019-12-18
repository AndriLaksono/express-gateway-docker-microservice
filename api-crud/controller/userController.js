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
    }, JWT_SECRET);
}

module.exports = {
    
    getUserData: (req, res) => {
        // let testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbmRyaSIsInN1YiI6IjVkZGNmOGFkMDc3YjZhMzY4Y2YxZmFlOCIsImlhdCI6MTU3NDg1MzkzNzc5NywiZXhwIjoxNTc0OTQwMzM3Nzk3fQ.gLcLbzT0JTjOslVqCrT1qezck-acjC8oIPW_SNFM1Pc';
        // let decoded = JWT.verify(testToken, 'secretAuth');
        // console.log(decoded);
        // res.send(decoded);

        User.find({}).sort({ name: 1 }).then(user => {
            res.send({
                err: false, 
                users: [...user]
            })
        }).catch(error => {
            res.status(403).send(error);
        })
    },

    deleteUserData: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.body.id);
            if (!user) {
                return res.send({
                    error: true,
                    message: "Error saat menghapus data.."
                })
            }
            res.send({
                error: false,
                message: "Berhasil hapus data.."
            })
        } catch (error) {
            res.status(500).send({
                error: true,
                message: {...error}
            })
        }
    },

    addUserData: async (req, res) => {
        const { name, email, password, age, level } = req.body;

        // jika email sudah ada
        const foundUser = await User.findOne({ email: email });
        if (foundUser) {
            return res.status(500).json({ error: true, message: "Email sudah digunakan..." });
        }
        if (!name) {
            return res.status(500).json({ error: true, message: "Name tidak boleh kosong" });
        }

        // create new user
        const newUser = new User({
            method: "local",
            email,
            password,
            name,
            age,
            level
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
            res.status(200).json({
                error: false,
                message: "Data berhasil ditambahkan..."
            });
        }).catch(err => {
            res.json({
                error: true,
                message: err
            });
        });
    },

    getDataUser: async (req, res) => {
        const id = req.params.id;
        try {
            const Usr = await User.findById(id);
            if (!Usr) {
                return res.send({
                    error: true,
                    message: "Data not found"
                })
            }
            res.send({
                error: false,
                message: "",
                user: Usr
            });
        } catch (error) {
            res.status(403).send({
                error: true,
                message: error.message
            })
        }
    },

    updateUserData: async (req, res) => {
        const { name, email, age, level, _id } = req.body;

        // jika email sudah ada
        const foundUser = await User.findById(_id);
        if (foundUser.email !== email) {
            let checkEmail = await User.findOne({ email: email });
            if (checkEmail) {
                return res.status(500).json({ error: true, message: "Email sudah digunakan..." });
            }
        }
        if (!name) {
            return res.status(500).json({ error: true, message: "Name tidak boleh kosong" });
        }

        // Update
        await User.findByIdAndUpdate(_id, { 
            $set: {
                name: name,
                email: email,
                age: age,
                level: level,
            }
        }, { new: true }).then(docs => {
            if (docs) {
                return res.send({
                    error: false,
                    message: "Berhasil update data...",
                    updatedUser: docs
                })
            }
            return res.send({
                error: true,
                message: "Gagal update data...",
                updatedUser: null
            })
        }).catch(err => {
            return res.send({
                error: true,
                message: err.message,
                updatedUser: null
            });
        });
    },

    updatePassUserData: async (req, res) => {
        const { id, password } = req.body;

        // Hash password
        const hash = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, hash);

        // update
        await User.findByIdAndUpdate(id, { 
            $set: {
                password: passwordHash
            }
        }, { new: true }).then(docs => {
            if (docs) {
                return res.send({
                    error: false,
                    message: "Password berhasil diperbarui...",
                });
            }
            return res.send({
                error: true,
                message: "Gagal update password..."
            });
        }).catch(err => {
            return res.send({
                error: true,
                message: err.message,
            });
        });
    },

}