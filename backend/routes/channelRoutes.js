    const express = require('express');
    const router = express.Router();
    const Channel = require('../models/channel');
    const passport = require('passport');


    const ensureAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
        return next();
        }
        res.redirect('/login'); // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
    };

    // Get all channels
    router.get('/', ensureAuthenticated,async (req, res) => {
    try {
        const channels = await Channel.find();
        res.json(channels);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
    });

    // Create a new channel
    router.post('/',  ensureAuthenticated,async (req, res) => {
    try {
        const { Nom, Frequence, Nbre_user, Logo } = req.body;
        const newChannel = new Channel({ Nom, Frequence, Nbre_user, Logo });
        const savedChannel = await newChannel.save();
        res.json(savedChannel);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
    }); 

    // Update a channel
    router.put('/:id', ensureAuthenticated,async (req, res) => {
    try {
        const { id } = req.params;
        const { Nom, Frequence, Nbre_user, Logo } = req.body;
        const updatedChannel = await Channel.findByIdAndUpdate(
        id,
        { Nom, Frequence, Nbre_user, Logo },
        { new: true }
        );
        res.json(updatedChannel);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
    });

    // Delete a channel
    router.delete('/:id', ensureAuthenticated,async (req, res) => {
    try {
        const { id } = req.params;
        await Channel.findByIdAndRemove(id);
        res.json({ message: 'Channel deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
    });

    module.exports = router;
