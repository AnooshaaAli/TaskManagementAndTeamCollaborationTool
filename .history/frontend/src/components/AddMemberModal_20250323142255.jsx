import React from 'react';
import TeamMemberForm from './TeamMemberForm';

const AddMember = ({ projectId, currentUserId, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add Team Member</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <TeamMemberForm 
            currentUserId={currentUserId} 
            projectId={projectId} 
          />
        </div>
      </div>
    </div>
  );
};

export default AddMember;