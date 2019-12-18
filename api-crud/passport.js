const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const config = require('./config/indexConfig');
const User = require('./models/userModel');



// JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
    // jwtFromRequest: ExtractJwt.fromHeader('authorization'), // WRONG
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // CORRECT
    secretOrKey: config.JWT_SECRET
}, async (payload, done) => {
    try {
        // find user specified in token
        const user = await User.findById(payload.sub);

        // handle if user doesnt exist
        if(!user) {
            return done(null, false);
        }

        // return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

// serialize & deserialize user
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});