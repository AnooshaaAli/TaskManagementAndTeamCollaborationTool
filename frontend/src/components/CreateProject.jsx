import React, { useState } from "react";
import { PlusCircle, X, Folder } from "lucide-react";

const CreateProject = ({ userID, onProjectCreated }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.description) {
      setError("Please complete all required fields");
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem("jwtToken");
    
    try {
      const response = await fetch("/backend/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          teamLeadID: userID,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onProjectCreated(data);
        setFormData({ name: "", description: "" });
        setShowForm(false);
      } else {
        setError(data.message || "Error creating project. Please try again.");
        console.error("Error creating project:", data);
      }
    } catch (error) {
      setError("Network error. Please check your connection and try again.");
      console.error("Error creating project:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showForm) {
    return (
      <div className="create-project-card">
        <button className="create-project-btn" onClick={() => setShowForm(true)}>
          <PlusCircle size={20} />
          <span>Create New Project</span>
        </button>
      </div>
    );
  }

  return (
    <div className="create-project-form-container">
      <div className="create-project-form">
        <div className="form-header">
          <Folder size={20} className="project-icon" />
          <h3>Create New Project</h3>
          <button 
            className="close-btn" 
            onClick={() => setShowForm(false)}
            aria-label="Close form"
          >
            <X size={18} />
          </button>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Project Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter project name"
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
              placeholder="Describe your project"
              rows={4}
              required
            />
          </div>
          
          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setShowForm(false)}
              disabled={isSubmitting}
            >
              <X size={16} />
              <span>Cancel</span>
            </button>
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="btn-spinner"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <PlusCircle size={16} />
                  <span>Create Project</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;