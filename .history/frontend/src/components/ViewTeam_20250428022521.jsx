import React, { useState } from 'react';

function ViewTeam({ projectId }) {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTeamMembers = async () => {
        setLoading(true);

        try {
            const token = localStorage.getItem("jwtToken");
            const response = await fetch(`http://localhost:8080/api/team/get-team/${projectId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch team members');
            }

            const data = await response.json();
            setTeamMembers(data);

        } catch (error) {
            console.error('Error fetching team members:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="view-team-container">
            <button className="view-team-button" onClick={fetchTeamMembers}>View Team Members</button>

            {loading && <p className="loading-text">Loading...</p>}

            <ul className="team-member-list" on>
                {teamMembers.map((member) => (
                    <li className="team-member" key={member.userID}>
                        {member.username}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ViewTeam;
