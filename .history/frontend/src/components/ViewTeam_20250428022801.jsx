import React, { useState, useEffect } from 'react';

function ViewTeam({ projectId }) {
    const [teamMembers, setTeamMembers] = useState([]);

    // Fetch team members when the component mounts
    useEffect(() => {
        const fetchTeamMembers = async () => {
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
            }
        };

        fetchTeamMembers();
    }, [projectId]); // The effect will run when the component mounts or when the projectId changes

    return (
        <div className="view-team-container">
            <ul className="team-member-list">
                {teamMembers.length === 0 ? (
                    <p>No team members found</p>
                ) : (
                    teamMembers.map((member) => (
                        <li className="team-member" key={member.userID}>
                            {member.profilePicUrl ? (
                                <img 
                                    src={member.profilePicUrl} 
                                    alt={`${member.username}'s profile`} 
                                    className="team-member-img"
                                />
                            ) : (
                                <div className="default-dp"></div>
                            )}
                            <span className="team-member-name">{member.username}</span>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default ViewTeam;
