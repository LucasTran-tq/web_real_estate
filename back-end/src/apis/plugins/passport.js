const passport = require('passport')

//passport Jwt
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

//passport Local
const LocalStrategy = require('passport-local').Strategy

//passport Google OAuth
const GooglePlusTokenStrategy = require('passport-google-plus-token')

//passport Facebook
const FacebookTokenStrategy = require('passport-facebook-token')

const { User } = require('../models/user.model')

const env = require('../../configs/env')

//Passport jwt
const jwtStrategy = new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
        secretOrKey: env.passport.jwtToken,
    },
    async (jwt_payload, done) => {
        try {
            const { id: userID } = jwt_payload

            const user = await User.findById(userID)

            if (!user) done(null, false)

            return done(null, user)
        } catch (error) {
            return done(error, false)
        }
    }
)

//Passport local
const localStrategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email })

            if (!user) return done(null, false)

            const isCorrectPassword = await user.isPasswordMatch(password)

            if (!isCorrectPassword) return done(null, false)

            return done(null, user)
        } catch (error) {
            done(error, false)
        }
    }
)

//Passport google
const googleStrategy = new GooglePlusTokenStrategy(
    {
        clientID: env.passport.google.clientID,
        clientSecret: env.passport.google.clientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            //check whether this current user exists in our database
            const user = await User.findOne({
                authGoogleID: profile.id,
                authType: 'google',
            })

            if (user) return done(null, user)

            //If new account
            const newUser = new User({
                authType: 'google',
                authGoogleID: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
            })

            await newUser.save()

            done(null, newUser)
        } catch (error) {
            console.log(error)
            return done(error, false)
        }
    }
)

//Passport facebook
const facebookStrategy = new FacebookTokenStrategy(
    {
        clientID: env.passport.facebook.clientID,
        clientSecret: env.passport.facebook.clientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            //check whether this current user exists in our database
            const user = await User.findOne({
                authFacebookID: profile.id,
                authType: 'facebook',
            })

            if (user) return done(null, user)

            //If new account
            const newUser = new User({
                authType: 'facebook',
                authFacebookID: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
            })

            await newUser.save()

            done(null, newUser)
        } catch (error) {
            console.log(error)
            return done(error, false)
        }
    }
)

module.exports = {
    jwtStrategy,
    localStrategy,
    googleStrategy,
    facebookStrategy,
    passport,
}
