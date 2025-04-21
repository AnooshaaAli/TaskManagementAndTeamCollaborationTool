import React, { useState, useEffect } from "react";

const ViewFile = ({ fileName }) => {
    const [fileContent, setFileContent] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch file content on mount
        const fetchFile = async () => {
            const token = localStorage.getItem("jwtToken"); // Get the token from local storage

            try {
                const response = await fetch(`http://localhost:8080/files/view/${fileName}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`, // Add the Authorization header
                    },
                });

                if (!response.ok) {
                    throw new Error("File not found or unable to fetch.");
                }

                const blob = await response.blob();
                const fileUrl = URL.createObjectURL(blob);
                setFileContent(fileUrl); // Set the file URL to display it
            } catch (err) {
                setError(err.message);
            }
        };

        fetchFile();
    }, [fileName]); // Re-run the fetch when fileName changes

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <a href={fileContent} target="_blank" rel="noopener noreferrer">
                View File
            </a>
        </div>
    );
};

export default ViewFile;
