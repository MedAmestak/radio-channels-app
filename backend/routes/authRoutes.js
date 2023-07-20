const express = require('express');
const passport = require('passport');
const router = express.Router();

// Redirect to Google authentication when the user accesses /auth/google
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// Callback route to handle the result after successful Google authentication
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/protected', // Redirect to a protected route after successful authentication
  failureRedirect: '/auth/google/failure', // Redirect to a failure route if authentication fails
}));

// Redirect to Google authentication failure route
router.get('/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});



module.exports = router;
