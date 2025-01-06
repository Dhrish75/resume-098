import React from "react";
import "./Template1.css";

const Template1 = ({ formData }) => {
  if (!formData) {
    return <p>Loading...</p>;
  }

  const skills = Array.isArray(formData.skills)
    ? formData.skills
    : typeof formData.skills === "string"
    ? formData.skills.split(",")
    : [];

  return (
    <div className="template1">
      <div className="header">
        {formData.image && (
          <img className="profile-image" src={formData.image} alt="Profile" />
        )}
        <div className="personal-info">
          <h1 className="name">
            {formData.firstName} {formData.lastName}
          </h1>
          <p className="about">
            <b>About:</b> {formData.about}
          </p>
          <p className="contact">
            <b>Contact:</b> {formData.contact}
          </p>
          <p className="email">
            <b>Email:</b> {formData.email}
          </p>
        </div>
      </div>

      <div className="section">
        <h3>Education</h3>
        <p>{formData.education}</p>
      </div>

      <div className="section">
        <h3>Experience</h3>
        <p>{formData.experience}</p>
      </div>

      <div className="section">
        <h3>Skills</h3>
        <ul className="skills-list">
          {skills.map((skill, index) => (
            <li key={index}>{skill.trim()}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>Extracurricular</h3>
        <p>{formData.extracurricular}</p>
      </div>
    </div>
  );
};

export default Template1;
