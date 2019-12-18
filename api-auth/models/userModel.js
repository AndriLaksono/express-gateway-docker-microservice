const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// create schema
const userSchema = new Schema({
    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },
    email: {
        type: String,
        lowercase: true
    },
    password: {
        type: String,
    },
    appUserId: {
        type: String,
        lowercase: true
    },
    name: {
        type: String,
        trim: true,
    },
    age: {
        type: Number,
        min: 1,
    },
    level: {
        type: Number,
        default: 0,
        min: [0, "minimal 0"],
        max: [2, "ga ada level >2"]
    }
});

userSchema.pre('save', async function(req, res, next) {
    try {
        if(this.method !== 'local') {
            return next();
        }

        // generate a hash
        const hash = await bcrypt.genSalt(10);
        // generate a password hash (hash + bcrypt.hash)
        const passwordHash = await bcrypt.hash(this.password, hash);
        // re-assign hashed version over original, plain text password
        this.password = passwordHash;
        next();
    } catch (error) {
        console.log('error', error);
        next(); 
    }
});

userSchema.methods.isValidPassword = async function(newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error(error)
    }
}

// create model
const User = mongoose.model('users', userSchema);

// export model
module.exports = User;