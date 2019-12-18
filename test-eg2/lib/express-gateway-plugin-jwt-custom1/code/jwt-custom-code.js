const uuid = require('uuid/v4');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const extractors = require('./extractors');
const jwt = require('jsonwebtoken')

module.exports = {
    name: 'jwt-custom1',
    policy: (actionParams, config) => {

        const strategyName = `jwt-${uuid()}`;
        const secretOrKey = actionParams.secretKey ? actionParams.secretKey : config.systemConfig.plugins['jwt-custom1'].secretKey;
        const jwtExtractor = actionParams.jwtExtractor ? actionParams.jwtExtractor : config.systemConfig.plugins['jwt-custom1'].jwtExtractor;
        const extractor = extractors[jwtExtractor]();
        const messageErr = config.systemConfig.plugins['jwt-custom1'].messageErr 
                            ? config.systemConfig.plugins['jwt-custom1'].messageErr 
                            : (actionParams.messageErr ? actionParams.messageErr : "Token has expired")

        actionParams.session = false;
        return async function (req, res, next) {

            // await jwt.verify(req.headers.authorization.split(' ')[1], secretOrKey, function(err, data){
            //     console.log("TOKEN adalah ", req.headers.authorization.split(' ')[1]);

            //     if (err) {
            //         return res.status(403).send({
            //             error: true,
            //             messageErr: "Invalid token"
            //         })
            //     }
            //     if (new Date() > new Date(data.exp)) {
            //         return res.status(401).send({
            //             error: true,
            //             messageErr
            //         })
            //     }
            //     if (data) {
            //         console.log(data);
            //         next()
            //     }
            // })
            
            await passport.use(strategyName, new JwtStrategy({
                jwtFromRequest: extractor,
                secretOrKey: secretOrKey
            }, function (payload, done) {

                console.log("PAYLOAD ", payload);

                if (new Date() > Date(payload.exp)) {
                    return res.status(401).send({
                        error: true,
                        messageErr
                    })
                }
                return done(null, payload);
            }));

            // await passport.authenticate(strategyName, actionParams, actionParams.getCommonAuthCallback(req, res, next))(req, res, next);
            await passport.authenticate(strategyName, actionParams, function(empty, payload, err){
                // console.log("user ", payload);
                // console.log("info ", empty);
                
                if (err) {
                    return res.status(403).send({
                        error: true,
                        messageErr: "Invalid token bro"
                    })
                }
                next()
            })(req, res, next);
        };
    }
};