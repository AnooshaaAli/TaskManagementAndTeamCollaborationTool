import React from 'react';
import RemoveMemberFromTeam from './RemoveMemberFromTeam';

const RemoveMember = ({ projectId, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Remove Team Member</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <RemoveMemberFromTeam projectId={projectId} />
        </div>
      </div>
    </div>
  );
};

export default RemoveMember;