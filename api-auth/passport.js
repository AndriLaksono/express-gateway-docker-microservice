const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20');
const FacebookTokenStrategy = require('passport-facebook-token');
const config = require('./config/indexConfig');
const User = require('./models/userModel');



// JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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


// FACEBOOK OAUTH STRATEGY 
passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: config.oauth.facebook.clientID,
    clientSecret: config.oauth.facebook.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('profile', profile);
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);

        const exitingUser = await User.findOne({ appUserId: profile.id });
        if (exitingUser) {
            console.log("User sudah terdaftar");
            return done(null, exitingUser);
        }

        const newUser = new User({
            method: "facebook",
            appUserId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName
        });

        await newUser.save();
        done(null, newUser)
    } catch (error) {
        done(error, false, error.message)
    }
}));


// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        // find the user given the email
        const user = await User.findOne({ email : email });

        // handle if not
        if (!user) {
            return done(null, false);
        }

        // check if password is correct
        const isMatch = await user.isValidPassword(password);
        console.log(isMatch);

        // handle if not
        if (!isMatch) {
            return done(null, false)
        }

        // return user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
    
}));

// GOOGLE OAUTH STRATEGY V2
passport.use('googleToken', new GoogleStrategy({
    clientID: config.oauth.google.clientID,
    clientSecret: config.oauth.google.clientSecret,
    callbackURL: "/users/auth/google/callback/"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('profile', profile);

        // check apakah current user ada di db
        const exitingUser = await User.findOne({ appUserId: profile.id });
        if (exitingUser) {
            console.log("User sudah terdaftar");
            return done(null, exitingUser);
        }

        console.log("User belum terdaftar, auto buat baru");
        // if new account
        const newUser = new User({
            method: 'google',
            appUserId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName
        });
        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error, false, error.message);
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