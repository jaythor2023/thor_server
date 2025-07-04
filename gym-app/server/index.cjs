const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;
const BOOKINGS_FILE = path.join(__dirname, "booking.json");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper: Read bookings from file
function readBookings() {
  try {
    const data = fs.readFileSync(BOOKINGS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    // If file doesn't exist or invalid, return empty array
    return [];
  }
}

// Helper: Write bookings to file
function writeBookings(bookings) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
}

// POST /api/bookings - add new booking
app.post("/api/bookings", (req, res) => {
  const { name, phone, date } = req.body;

  if (!name || !phone || !date) {
    return res.status(400).json({ error: "Name, phone, and date are required." });
  }

  const bookings = readBookings();

  const newBooking = {
    id: Date.now(),
    name,
    phone,
    date,
    bookedAt: new Date().toISOString(),
  };

  bookings.push(newBooking);
  writeBookings(bookings);

  res.status(201).json({ message: "Booking added successfully.", booking: newBooking });
});

// GET /api/bookings - get all bookings (for admin)
app.get("/api/bookings", (req, res) => {
  const bookings = readBookings();
  res.json(bookings);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
