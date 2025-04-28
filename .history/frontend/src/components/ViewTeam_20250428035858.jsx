import React, { useState, useEffect } from 'react';

function ViewTeam({ projectId ) {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [profilePics, setProfilePics] = useState({});
    const [error, setError] = useState(null);

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

            onTeamSizeChange(data.length);

            data.forEach(member => {
                fetchProfilePic(member.userID, token);
            });

        } catch (error) {
            console.error('Error fetching team members:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchProfilePic = async (userID, token) => {
        try {
            const response = await fetch(`http://localhost:8080/files/user-dp/${userID}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error("Profile picture not found or error occurred.");
            }

            // Get the image as a Blob
            const imageBlob = await response.blob();

            // Create a temporary URL for the image Blob
            const imageUrl = URL.createObjectURL(imageBlob);

            // Set the image URL in the profilePics state
            setProfilePics(prevPics => ({
                ...prevPics,
                [userID]: imageUrl
            }));
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchTeamMembers();
    }, [projectId]);

    return (
        <div className="view-team-container">
            <ul className="team-member-list">
                {teamMembers.map((member) => (
                    <li className="team-member" key={member.userID}>
                        <div className="member-info">
                            {profilePics[member.userID] ? (
                                <img
                                    src={profilePics[member.userID]}
                                    alt={`${member.username}'s profile`}
                                    className="team-member-img"
                                />
                            ) : (
                                <div className="default-dp">No Image</div>
                            )}
                            <span>{member.username}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ViewTeam;
