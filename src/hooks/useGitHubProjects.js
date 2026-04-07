import { useState, useEffect } from 'react';
import axios from 'axios';

const useGitHubProjects = (username) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // List of projects to explicitly include (Exact names from GitHub)
    const projectsToKeep = [
        "Ai-Career",
        "Manthan",
        "Movie_and_song_recommendation",
        "promptathon"
    ];

    const mockProjects = [
        {
            id: 101,
            name: "Ai-Career",
            description: "AI-driven career guidance platform helping students choose the right path using machine learning.",
            html_url: "https://github.com/Yashika-2806/Ai-Career",
            language: "Python",
            stargazers_count: 5,
            topics: ["ai", "machine-learning", "career"],
            fork: false
        },
        {
            id: 102,
            name: "Manthan",
            description: "A comprehensive project for data analysis and visualization.",
            html_url: "https://github.com/Yashika-2806/Manthan",
            language: "Python",
            stargazers_count: 3,
            topics: ["data-analysis", "visualization"],
            fork: false
        },
        {
            id: 103,
            name: "Movie_and_song_recommendation",
            description: "A recommendation engine that suggests movies and songs based on user preferences and history.",
            html_url: "https://github.com/Yashika-2806/Movie_and_song_recommendation",
            language: "Jupyter Notebook",
            stargazers_count: 8,
            topics: ["recommendation-system", "python", "data-science"],
            fork: false
        },
        {
            id: 105,
            name: "promptathon",
            description: "Project built for a Prompt Engineering Hackathon, leveraging LLMs for creative solutions.",
            html_url: "https://github.com/Yashika-2806/promptathon",
            language: "Python",
            stargazers_count: 7,
            topics: ["llm", "prompt-engineering", "ai"],
            fork: false
        }
    ];

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Fetch all repos without sorting or pagination params first
                const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);
                console.log("GitHub API Response:", response.data);

                if (Array.isArray(response.data) && response.data.length > 0) {
                    // Filter to keep only the requested projects
                    const filtered = response.data.filter(repo => projectsToKeep.includes(repo.name));

                    if (filtered.length > 0) {
                        setProjects(filtered);
                    } else {
                        console.warn("No matching repositories found. Using mock data.");
                        setProjects(mockProjects);
                    }
                } else {
                    console.warn("GitHub API returned empty list. Using mock data.");
                    setProjects(mockProjects);
                }
            } catch (err) {
                console.error("GitHub API Error:", err);
                // Fallback to mock data on error
                setProjects(mockProjects);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchProjects();
        } else {
            setProjects(mockProjects);
            setLoading(false);
        }
    }, [username]);

    return { projects, loading, error };
};

export default useGitHubProjects;
