const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


// Configuration de la stratégie Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },
function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }));

    passport.serializeUser(function(user, done) {
      done(null, user);
    });
    
    passport.deserializeUser(function(user, done) {
      done(null, user);
    });