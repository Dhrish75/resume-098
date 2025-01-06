import React from "react";
import"./Template2.css"

const Template2 = ({ formData }) => {
  if (!formData) {
    return <p>Loading...</p>;
  }

  // Ensure skills is an array
  const skills = Array.isArray(formData.skills)
    ? formData.skills
    : typeof formData.skills === "string"
    ? formData.skills.split(",")
    : [];

  return (
    <div className="template2">
      <header>
        <h1>
          {formData.firstName} {formData.lastName}
        </h1>
        <p>
          <b>Contact:</b> {formData.contact} | <b>Email:</b> {formData.email}
        </p>
      </header>
      <section>
        <h2>About Me</h2>
        <p>{formData.about}</p>
      </section>
      <section>
        <h2>Skills</h2>
        <div className="skills">
          {skills.map((skill, index) => (
            <span key={index} className="skill-badge">
              {skill.trim()}
            </span>
          ))}
        </div>
      </section>
      <section>
        <h2>Education</h2>
        <p>{formData.education}</p>
      </section>
      <section>
        <h2>Experience</h2>
        <p>{formData.experience}</p>
      </section>
      <section>
        <h2>Extracurricular</h2>
        <p>{formData.extracurricular}</p>
      </section>
    </div>
  );
};

export default Template2;