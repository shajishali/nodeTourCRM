const express = require("express");
const router = express.Router();
const pool = require("../db");

// Create a booking
router.post("/", async (req, res) => {
  const { itinerary_id, user_id } = req.body;
  if (!itinerary_id || !user_id) {
    return res.status(400).json({ error: "Missing itinerary_id or user_id" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO bookings (itinerary_id, user_id) VALUES ($1, $2) RETURNING *`,
      [itinerary_id, user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating booking:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
