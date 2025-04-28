import React, { useState, useEffect } from 'react';

function ViewTeam({ projectId }) {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [profilePics, setProfilePics] = useState({});
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        totalMembers: 0,
        activeMembers: 0,
        roles: {}
    });

    const fetchTeamMembers = async () => {
        setLoading(true);
        setError(null); // Reset error state before fetching

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
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to fetch team members');
            }

            const data = await response.json();
            
            setTeamMembers(data);
            
            const roleCount = data.reduce((acc, member) => {
                const role = member.role || 'Member';
                acc[role] = (acc[role] || 0) + 1;
                return acc;
            }, {});
            
            setStats({
                totalMembers: data.length,
                activeMembers: data.filter(m => m.isActive).length,
                roles: roleCount
            });

            // Only fetch profile pictures if there are team members
            if (data.length > 0) {
                const picturePromises = data.map(member => 
                    fetchProfilePic(member.userID, token)
                );
                
                await Promise.allSettled(picturePromises);
            }

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
                throw new Error("Profile picture not found");
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
            
            return imageUrl;
        } catch (err) {
            console.log(`Could not load profile picture for user ${userID}`);
            return null;
        }
    };

    useEffect(() => {
        fetchTeamMembers();
        
        // Cleanup function to revoke any object URLs to avoid memory leaks
        return () => {
            Object.values(profilePics).forEach(url => {
                URL.revokeObjectURL(url);
            });
        };
    }, [projectId]);

    const getInitials = (username) => {
        if (!username) return "??";
        return username.split(' ')
            .map(name => name[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    if (loading) {
        return (
            <div className="view-team-container">
                <div className="loading">
                    <div className="loading-animation">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <p>Loading team members...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="view-team-container">
                <div className="error">
                    <p>Error: {error}</p>
                    <button onClick={fetchTeamMembers} className="retry-button">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="view-team-container">
            <h2 className="section-title">Team Members</h2>
            
            {teamMembers.length > 0 ? (
                <>
                    <div className="team-stats">
                        <div className="stat-item">
                            <div className="stat-value">{stats.totalMembers}</div>
                            <div className="stat-label">Team Members</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">{stats.activeMembers}</div>
                            <div className="stat-label">Active Members</div>
                        </div>
                    </div>
                    
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
                                        <div className="default-dp">
                                            {getInitials(member.username)}
                                        </div>
                                    )}
                                    <div>
                                        <span>{member.username}</span>
                                        {member.role && (
                                            <div className="team-member-role">{member.role}</div>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <div className="no-members">
                    <img 
                        src="/assets/no-team.svg" 
                        alt="No team members" 
                        className="no-members-img"
                        onError={(e) => e.target.style.display = 'none'}
                    />
                    <p>No team members found for this project.</p>
                    <p className="no-members-subtitle">You can add team members to collaborate on this project.</p>
                </div>
            )}
        </div>
    );
}

export default ViewTeam;