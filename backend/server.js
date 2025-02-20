require("dotenv").config();
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to SQLite database
const db = new sqlite3.Database("./blog.db", (err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to SQLite database");

    // Create posts table if not exists
    db.run(
      `CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        body TEXT NOT NULL
      )`,
      (err) => {
        if (err) console.error("Error creating posts table:", err.message);
      }
    );

    // Create contacts table if not exists
    db.run(
      `CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL
      )`,
      (err) => {
        if (err) console.error("Error creating contacts table:", err.message);
      }
    );
  }
});

// Nodemailer setup using Gmail SMTP with TLS settings
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // Use 465 for SSL, 587 for TLS
  secure: true, // true for port 465, false for port 587
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail email
    pass: process.env.EMAIL_PASS, // Your Gmail app password
  },
  tls: {
    rejectUnauthorized: false, // Allows self-signed certificates
  },
});

// Function to send email
const sendConfirmationEmail = async (toEmail) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: "Thank You for Contacting Me!",
    text: `Thanks for contacting me! I am always ready and willing to help bring the company to a higher height. Looking forward to working with you!`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent:", info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

/** 
 * 📝 BLOG ROUTES
 */

// 🟢 GET all posts
app.get("/posts", (req, res) => {
  db.all("SELECT * FROM posts", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 🟢 CREATE a new post
app.post("/posts", (req, res) => {
  const { title, body } = req.body;
  db.run("INSERT INTO posts (title, body) VALUES (?, ?)", [title, body], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, title, body });
  });
});

/** 
 * 📩 CONTACT ROUTES
 */

// 🟢 Submit a contact form
app.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = `INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)`;
  db.run(query, [name, email, subject, message], async function (err) {
    if (err) {
      console.error("Error inserting contact:", err.message);
      return res.status(500).json({ error: "Failed to save message" });
    }

    // Send confirmation email
    const emailSent = await sendConfirmationEmail(email);
    if (!emailSent) {
      return res.status(500).json({ error: "Message saved, but email not sent." });
    }

    console.log("Inserted contact message with ID:", this.lastID);
    res.status(201).json({ message: "Message received!", id: this.lastID });
  });
});

// 🟢 Get all contact messages (for admin use)
app.get("/contacts", (req, res) => {
  db.all("SELECT * FROM contacts", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "Error fetching messages" });
    res.json(rows);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
