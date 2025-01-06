/* 
N
A
V
B
A
R
*/ 
import React from "react";
import { Link, Outlet } from "react-router-dom"; // Correctly import Outlet

const DoThis = () => {

}

class Navbar extends React.Component {
  render() {
    return (
      <>
        <nav className="navbar" style={{ backgroundColor: "#E0E0E0" }}>
          <div className="container-fluid">
            <a className="navbar-brand" href="#" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              RESUME BUILDER
            </a>
            <div className="nav-item" on onClick={DoThis}>
          <a data-bs-toggle="popover" data-bs-placement="bottom" >Contact</a>
        </div>
        <Link to = "/signup" className="nav-item2">Login</Link>
          </div>
        </nav>
        <Outlet /> {/* This will render the Card or Details component */}
      </>
    );
  }
}

export default Navbar;

/*
T
E
M
P
S
E
L
E
C
T
I
O
N
*/
import React, { Component } from "react";
import axios from "axios";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import "./TemplateSelection.css";

class TemplateSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: null, // Holds fetched data
      selectedTemplate: null, // Tracks the selected template
    };

    // Bind the selectTemplate method
    this.selectTemplate = this.selectTemplate.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/Submit")
      .then((response) => {
        if (response.data && typeof response.data === "object") {
          this.setState({ formData: response.data }); // Directly use the object if it's not an array
        } else {
          console.error("Unexpected response format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  selectTemplate(templateName) {
    this.setState({ selectedTemplate: templateName });
  }

  renderTemplatePreviews() {
    const { formData } = this.state;

    return (
      <div className="template-preview-container">
        {/* Display Template 1 Preview */}
        <div className="template-preview">
          <h4>Template 1</h4>
          <div className="template-box">
            <Template1 formData={formData || {}} />
          </div>
          <button
            className="btn btn-primary mt-2"
            onClick={() => this.selectTemplate("Template1")}
          >
            Select Template 1
          </button>
        </div>

        {/* Display Template 2 Preview */}
        <div className="template-preview">
          <h4>Template 2</h4>
          <div className="template-box">
            <Template2 formData={formData || {}} />
          </div>
          <button
            className="btn btn-secondary mt-2"
            onClick={() => this.selectTemplate("Template2")}
          >
            Select Template 2
          </button>
        </div>
      </div>
    );
  }

  renderSelectedTemplate() {
    const { selectedTemplate, formData } = this.state;

    if (!formData) {
      return <p>Loading user data...</p>;
    }

    if (selectedTemplate === "Template1") {
      return <Template1 formData={formData} />;
    } else if (selectedTemplate === "Template2") {
      return <Template2 formData={formData} />;
    }
    return <p>Please select a template to preview.</p>;
  }

  render() {
    return (
      <div className="template-selection">
        {/* Centered subtitle */}
        <h2 className="subtitle">Select a Template</h2>

        {/* Render template previews */}
        {this.renderTemplatePreviews()}

        {/* Render selected template */}
        <div className="selected-template">
          {this.renderSelectedTemplate()}
        </div>
      </div>
    );
  }
}



/*
D
E
T
A
I
L
S
*/
import React, { useState, useEffect } from "react";
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
    };

    console.log("Form Data: ", formData); // Check the data

    // Send POST request to the backend
    axios
      .post("http://localhost:3001/Submit", formData)
      .then((response) => {
        console.log("Data submitted successfully:", response.data);
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
        setImage(res.data.image);
        navigate(`/display?image=${res.data.image}`); // Navigate to the next page
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



