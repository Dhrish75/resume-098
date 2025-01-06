const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { EmployeeModel, UserModel, PhotoModel } = require('./models/userModel'); // Assuming combined models are exported from userModels.js

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(express.static('public'));
app.use('/images', express.static(path.join(__dirname, 'public/images'))); // Serve static image files

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/resumeBuilder", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public/images')); // Ensure the path exists
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Generate unique filenames
    }
});
const upload = multer({ storage: storage });

// Routes

// Upload an image
app.post('/upload', upload.single('file'), (req, res) => {
    PhotoModel.create({ image: req.file.filename })
        .then(() => res.json({ image: req.file.filename }))
        .catch(err => {
            console.error("Error uploading image:", err);
            res.status(500).json({ error: "Error uploading image" });
        });
});

// Fetch all uploaded images
app.get('/getImage', (req, res) => {
    PhotoModel.find()
        .then(photos => res.json(photos))
        .catch(err => {
            console.error("Error fetching images:", err);
            res.status(500).json({ error: "Error fetching images" });
        });
});

// Register an employee
app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employee => res.json(employee))
        .catch(err => {
            console.error("Error registering employee:", err);
            res.status(400).json(err);
        });
});

// Submit user details
app.post('/Submit', (req, res) => {
    console.log("Received data:", req.body);
    UserModel.create(req.body)
        .then(user => {
            console.log("User saved:", user);
            res.json(user);
        })
        .catch(err => {
            console.error("Error saving user:", err);
            res.status(400).json(err);
        });
});

// Fetch all user details
app.get('/Submit', (req, res) => {
    UserModel.find()
        .then(users => {
            console.log("Fetched users:", users);
            res.json(users[0]);
        })
        .catch(err => {
            console.error("Error fetching users:", err);
            res.status(500).json({ error: "Error fetching users" });
        });
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
