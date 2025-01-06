import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Details() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [about, setAbout] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [jobs, setJobs] = useState("");
  const [skills, setSkills] = useState("");
  const [extracurricular, setExtracurricular] = useState("");
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!"); // Debug message

    const formData = {
      firstName,
      lastName,
      about,
      contact,
      email,
      link,
      education,
      experience,
      jobs,
      skills,
      extracurricular,
      image, // Include the image URL here
    };

    console.log("Form Data: ", formData); // Check the data

    // Send POST request to the backend
    axios
      .post("http://localhost:3001/Submit", formData)
      .then((response) => {
        console.log("Data submitted successfully:", response.data);
        // Navigate to Template Selection page and pass form data
        navigate("/TemplateSelection", { state: formData });
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:3001/upload", formData)
      .then((res) => {
        setImage(res.data.image); // Set the uploaded image URL
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Name */}
      <div className="row mt-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            name="firstName"
            aria-label="First name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            name="lastName"
            aria-label="Last name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      {/* About */}
      <div className="form-floating mt-3">
        <textarea
          className="form-control"
          placeholder="About Yourself"
          name="about"
          onChange={(e) => setAbout(e.target.value)}
        />
        <label>About Yourself</label>
      </div>
      {/* Contact info */}
      <div className="row g-2 mt-3">
        <div className="col-sm">
          <input
            type="text"
            className="form-control"
            placeholder="Contact"
            name="contact"
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div className="col-sm">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-sm">
          <input
            type="text"
            className="form-control"
            placeholder="Link"
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
      </div>
      {/* Education */}
      <div className="form-floating mt-3">
        <textarea
          className="form-control"
          placeholder="Education"
          name="education"
          onChange={(e) => setEducation(e.target.value)}
        />
        <label>Education</label>
      </div>
      {/* Experience */}
      <select
        className="form-select mt-3"
        name="experience"
        onChange={(e) => setExperience(e.target.value)}
      >
        <option value="">Experience</option>
        <option value="Fresher">Fresher</option>
        <option value="0-3 years">0-3 years</option>
        <option value="3-5 years">3-5 years</option>
        <option value="5+ years">5+ years</option>
      </select>
      {/* Work Exp/projects/internships */}
      <div className="form-floating mt-3">
        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea2"
          style={{ height: 100 }}
          onChange={(e) => setJobs(e.target.value)}
        />
        <label htmlFor="floatingTextarea2">Jobs/Internships/Courses</label>
      </div>
      {/* Skills */}
      <div className="form-floating mt-3">
        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea"
          onChange={(e) => setSkills(e.target.value)}
        />
        <label htmlFor="floatingTextarea">Skills</label>
      </div>
      {/* Extracurricular */}
      <div className="form-floating mt-3">
        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea"
          onChange={(e) => setExtracurricular(e.target.value)}
        />
        <label htmlFor="floatingTextarea">Extracurricular</label>
      </div>
      {/* File Upload */}
      <div className="mt-3">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="form-control"
        />
        <button
          type="button"
          onClick={handleUpload}
          className="btn btn-secondary mt-2"
        >
          Upload Profile Image
        </button>
        {image && <img src={image} alt="Uploaded Profile" className="mt-2" />}
      </div>
      {/* Submit Button */}
      <div className="d-grid gap-2 col-6 mx-auto mt-3">
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

export default Details;
