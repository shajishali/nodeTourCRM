const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const pool = require("../models/Itinerary");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

/* ---------------- AUTH ROUTES ---------------- */

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already registered!" });
    }

    const hashed_pwd = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashed_pwd]
    );

    res.status(201).json({ message: "User registered!", user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------- LOCATION ROUTES ---------------- */

router.get("/locations", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM locations");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Error fetching locations" });
  }
});

router.post("/locations/create", upload.single("image"), async (req, res) => {
  const {
    name,
    longitude,
    latitude,
    description,
    type,
    address,
    city,
    district,
    rating,
    entry_fee,
    contact_number,
    website,
    opening_hours,
  } = req.body;

  const image_url = req.file ? req.file.path : null;

  try {
    const result = await pool.query(
      `INSERT INTO locations 
      (name, longitude, latitude, description, image_url, type, address, city, district, rating, entry_fee, contact_number, website, opening_hours) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`,
      [
        name,
        longitude,
        latitude,
        description,
        image_url,
        type,
        address,
        city,
        district,
        rating,
        entry_fee,
        contact_number,
        website,
        opening_hours,
      ]
    );
    res.status(201).json({ message: "Location created", location: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating location" });
  }
});

router.put("/locations/update/:id", async (req, res) => {
  const { id } = req.params;
  const fields = req.body;
  const keys = Object.keys(fields);
  const updates = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
  const values = Object.values(fields);

  try {
    const result = await pool.query(
      `UPDATE locations SET ${updates} WHERE id = $${keys.length + 1} RETURNING *`,
      [...values, id]
    );
    res.json({ message: "Location updated", location: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: "Error updating location" });
  }
});

router.delete("/locations/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM locations WHERE id = $1", [id]);
    res.json({ message: "Location deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting location" });
  }
});

/* ---------------- BOOKINGS ---------------- */

router.get("/bookings/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM bookings WHERE user_id = $1", [id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

router.post("/bookings/:id/book", async (req, res) => {
  const { id } = req.params;
  const { location_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO bookings (user_id, location_id) VALUES ($1, $2) RETURNING *",
      [id, location_id]
    );
    res.status(201).json({ message: "Booking successful", booking: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: "Error booking location" });
  }
});

router.delete("/bookings/:id/cancel", async (req, res) => {
  const { id } = req.params;
  const { location_id } = req.body;
  try {
    await pool.query("DELETE FROM bookings WHERE user_id = $1 AND location_id = $2", [id, location_id]);
    res.json({ message: "Booking cancelled" });
  } catch (err) {
    res.status(500).json({ message: "Error cancelling booking" });
  }
});

/* ---------------- WISH LIST ---------------- */

router.get("/wish_list/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM wish_lists WHERE user_id = $1", [id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Error fetching wish list" });
  }
});

router.post("/wish_list/add", async (req, res) => {
  const { user_id, location_id } = req.body;
  try {
      
    console.log(user_id, location_id);
    const result = await pool.query(
      "INSERT INTO wish_lists (user_id, location_id) VALUES ($1, $2) RETURNING *",
      [user_id, location_id]
    );
      
    console.log(user_id, location_id);
    res.status(201).json({ message: "Added to wish list", wish: result.rows[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adding to wish list" });
  }
});

router.delete("/wish_list/remove", async (req, res) => {
  const { user_id, location_id } = req.body;
  try {
    await pool.query("DELETE FROM wish_lists WHERE user_id = $1 AND location_id = $2", [user_id, location_id]);
    res.json({ message: "Removed from wish list" });
  } catch (err) {
    res.status(500).json({ message: "Error removing from wish list" });
  }
});

/* ---------------- PAYMENTS ---------------- */

router.get("/payments", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM payments");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Error fetching payments" });
  }
});

router.post("/payments/new", async (req, res) => {
  const { user_id, location_id, amount, method } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO payments (user_id, location_id, amount, method) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, location_id, amount, method]
    );
    res.status(201).json({ message: "Payment added", payment: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: "Error adding payment" });
  }
});

/* ---------------- ITINERARIES CRUD ---------------- */

// CREATE
router.post("/itineraries/create", async (req, res) => {
  const { name, longitude, latitude, description, imageUrl, type, address, city, district, country, rating, entryFee, contact, website, opening } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO itineraries (name, longitude, latitude, description, image_url, type, address, city, district, country, rating, entry_fee, contact_number, website, opening_hours)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
      [name, longitude, latitude, description, imageUrl, type, address, city, district, country, rating, entryFee, contact, website, opening]
    );
    res.status(201).json({ message: "Itinerary created", itinerary: result.rows[0] });
  } catch (err) {
    console.error("Error creating itinerary:", err);
    res.status(500).json({ message: "Server error creating itinerary" });
  }
});

// READ ALL
router.get("/itineraries", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM itineraries ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Error fetching itineraries" });
  }
});

// READ SINGLE
router.get("/itineraries/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM itineraries WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Itinerary not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Error fetching itinerary" });
  }
});

// UPDATE
router.put("/itineraries/:id", async (req, res) => {
  const { id } = req.params;
  const { title, destination, start_date, end_date, activities } = req.body;

  try {
    const result = await pool.query(
      `UPDATE itineraries
       SET title = $1, destination = $2, start_date = $3, end_date = $4, activities = $5
       WHERE id = $6 RETURNING *`,
      [title, destination, start_date, end_date, activities, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    res.json({ message: "Itinerary updated", itinerary: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: "Error updating itinerary" });
  }
});

// DELETE
router.delete("/itineraries/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM itineraries WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    res.json({ message: "Itinerary deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting itinerary" });
  }
});

module.exports = router;
