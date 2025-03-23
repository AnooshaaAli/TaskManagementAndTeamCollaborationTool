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

    // Ensure form data is valid
    if (!formData.name || !formData.description) {
      setError("Please complete all required fields");
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem("jwtToken");
    
    try {
      const response = await fetch("http://localhost:8080/projects", {
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

// CSS styles to add to your stylesheet
const createProjectStyles = `
.create-project-card {
  background-color: #1a1a1a;
  border: 1px dashed #3b6bc9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  height: 100%;
  min-height: 180px;
  transition: all 0.2s;
}

.create-project-card:hover {
  background-color: rgba(59, 107, 201, 0.05);
}

.create-project-btn {
  background-color: transparent;
  border: none;
  color: #3b6bc9;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.2s;
}

.create-project-btn span {
  font-size: 14px;
  font-weight: 500;
}

.create-project-form-container {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.create-project-form {
  background-color: #212121;
  border-radius: 8px;
  border: 1px solid #333;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

.form-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
}

.form-header h3 {
  margin: 0;
  margin-left: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.project-icon {
  color: #3b6bc9;
}

.close-btn {
  position: absolute;
  right: 0;
  top: 0;
  background: transparent;
  border: none;
  color: #9e9e9e;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.close-btn:hover {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #e6e6e6;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px 12px;
  background-color: #2a2a2a;
  border: 1px solid #333;
  border-radius: 6px;
  color: #e6e6e6;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b6bc9;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #666;
}

.error-message {
  background-color: rgba(220, 38, 38, 0.1);
  color: #ef4444;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 14px;
  border-left: 3px solid #ef4444;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.cancel-btn,
.submit-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn {
  background-color: transparent;
  border: 1px solid #333;
  color: #9e9e9e;
}

.cancel-btn:hover {
  background-color: #2a2a2a;
  color: #fff;
}

.submit-btn {
  background-color: #3b6bc9;
  border: none;
  color: white;
}

.submit-btn:hover {
  background-color: #325bb0;
}

.submit-btn:disabled,
.cancel-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-spinner {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 2px solid #fff;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

export default CreateProject;