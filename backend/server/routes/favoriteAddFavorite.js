const express = require('express');
const router = express.Router();
const Favorite = require('../models/favoriteMode');

router.post('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { stopId, stopName, lineColor, arrivalTime, lineName, destination } = req.body;
  
  try {
    const newFavorite = new Favorite({
      userId,
      stopId,
      stopName,
      lineColor,
      arrivalTime,
      lineName,
      destination
    });

    const savedFavorite = await newFavorite.save();
    res.json(savedFavorite);
  } catch (error) {
    res.status(500).json({ message: 'Error saving favorite', error });
  }
});

router.delete('/:userId/:stopId', async (req, res) => {
  const { userId, stopId } = req.params;
  
  try {
    const deletedFavorite = await Favorite.findOneAndRemove({ userId, stopId });
    
    if (!deletedFavorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.json({ message: 'Favorite deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting favorite', error });
  }
});

module.exports = router;
