const express = require("express");
const router = express.Router();
const Activity = require('../models/Activities')

// GET all activities
router.getActivity= (async (req, res) => {
    try {
      const activities = await Activity.find().sort({ timestamp: -1 });
      res.json(activities); // Send activities as JSON data
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // POST new activity
  router.postActivity =( async (req, res) => {


    
  
    try {
      const {activityType, timestamp } = req.body;
    const newActivity = new Activity({
      activityType,
      timestamp,
      userId: req.user._id, 
    })
     
      await newActivity.save();
      res.status(201).json(newActivity); // Send the newly created activity as JSON data
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  module.exports = router;
  