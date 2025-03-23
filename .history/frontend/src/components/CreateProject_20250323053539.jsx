import React, { useState } from "react";
import { PlusCircle, X } from "lucide-react";

const CreateProject = ({ userID, onProjectCreated }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure form data is valid
    if (!formData.name || !formData.description) {
      return;
    }

    const token = localStorage.getItem("jwtToken"); // Assuming you store the token in local storage

    try {
      const response = await fetch("http://localhost:8080/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token here
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          teamLeadID: userID,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onProjectCreated(data); // Notify parent component about the new project
        setFormData({ name: "", description: "" }); // Reset the form
        setShowForm(false); // Close the form
      } else {
        console.error("Error creating project:", data);
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  if (!showForm) {
    return (
      <div className="create-project-container">
        <button className="create-project-btn" onClick={() => setShowForm(true)}>
          <PlusCircle size={20} />
          Create New Project
        </button>
      </div>
    );
  }

  return (
    <div className="create-project-container">
      <div className="create-project-form">
        <h3>Create New Project</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Project Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setShowForm(false)}
            >
              <X size={16} style={{ marginRight: "4px" }} />
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              <PlusCircle size={16} style={{ marginRight: "4px" }} />
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
