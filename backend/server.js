const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const http = require('http');
const socketIO = require('socket.io');
const dotenv = require('dotenv'); // Import dotenv
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

require('./config/passport');

const authRoutes = require('./routes/authRoutes'); // Import authRoutes.js

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Set up WebSocket server using Socket.IO
io.on('connection', (socket) => {
  console.log('A user connected');

  // Event handler for WebSocket messages from the client
  socket.on('message', (data) => {
    console.log('Received message:', data);
    // Add logic to handle incoming messages from the client if needed
  });

  // Event handler for WebSocket disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Middleware to check if the user is authenticated
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

// Middleware to parse JSON data in the request body
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


// Routes
app.use('/auth', authRoutes);
app.use(
  session({
    secret: 'wferh3Df$!QAZ',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/channels', require('./routes/channelRoutes'));

// Auth routes
app.get('/auth/google', (req, res) => {
  console.log('Received request to /auth/google');
  passport.authenticate('google', { scope: ['email', 'profile'] })(req, res);
});

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure',
  })
);

app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

// Add a new route to check the user's authentication status
// app.get('/checkAuth', (req, res) => {
//   if (req.isAuthenticated()) {
//     // User is authenticated, send the user information
//     res.json({ isAuthenticated: true, user: req.user });
//   } else {
//     // User is not authenticated
//     res.json({ isAuthenticated: false });
//   }
// });

// Start the server
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
