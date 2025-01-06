const mongoose = require('mongoose');

// Employee Schema
const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const EmployeeModel = mongoose.model("Employee", EmployeeSchema);

// User Schema
const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    about: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    education: { type: String, required: true },
    experience: { type: String, required: true },
    jobs: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    extracurricular: { type: [String], default: [] }
});

const UserModel = mongoose.model("User", UserSchema);

// Photo Schema (for image uploads)
const PhotoSchema = new mongoose.Schema({
    image: { type: String, required: true } // Stores the image filename
});

const PhotoModel = mongoose.model("Photo", PhotoSchema);

// Export all models
module.exports = { EmployeeModel, UserModel, PhotoModel };
