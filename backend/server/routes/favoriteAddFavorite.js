const express = require('express');
const router = express.Router();
const Favorite = require('../models/favoriteMode');

router.post('/:userId/favorites', async (req, res) => {
 
  console.log("Received a request to add a favorite");
  console.log(req.body); 
  
  const { userId } = req.params;
  console.log('UserID:', userId);
  
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

    console.log('New favorite:', newFavorite);

    const savedFavorite = await newFavorite.save();
    console.log('Saved favorite:', savedFavorite); //
    res.status(200).json(savedFavorite);
  } catch (error) {
    res.status(500).json({ message: 'Error saving favorite', error });
  }
});
//
router.get('/:userId/favorites', async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.params.userId });
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:userId/favorites/:stopId', async (req, res) => {
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
