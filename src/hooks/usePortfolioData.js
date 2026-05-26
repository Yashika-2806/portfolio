import { useState, useEffect } from 'react';
import axios from 'axios';
import fallbackData from '../data/db.json';

// Transform raw db.json structure into the expected component structure
const transformData = (rawData) => {
  if (!rawData) return null;

  return {
    name: rawData.name || 'Portfolio',
    hero: {
      tagline: rawData.bio || 'Welcome',
      title: ['Build', 'the Future'],
      roles: rawData.typewriter || ['Developer'],
      description: rawData.bio || 'Creating amazing things',
      resumeUrl: '#',
      imageUrl: '/images/profile.jpg'
    },
    about: rawData.about || '',
    social: rawData.social || {
      github: '#',
      linkedin: '#',
      email: '#'
    },
    skills: rawData.skills || {
      languages: [],
      frontend: [],
      backend: [],
      ai_ml: [],
      tools: []
    },
    projects: rawData.projects || [],
    certifications: rawData.certifications || [],
    achievements: rawData.achievements || [],
    workshops: rawData.workshops || [],
    contact: rawData.contact || {
      email: 'contact@example.com',
      phone: '+1 (555) 000-0000'
    },
    videoResume: rawData.videoResume || null
  };
};

const usePortfolioData = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api');
        // If API returns valid data with required structure, use it
        if (response.data && response.data.hero && Object.keys(response.data).length > 0) {
          setPortfolioData(response.data);
        } else {
          // If API returns incomplete data, use transformed fallback
          console.log("API data is incomplete or missing, using fallback.");
          setPortfolioData(transformData(fallbackData));
        }
      } catch (error) {
        console.error("Failed to fetch data from API, using fallback.", error);
        // If API call fails, use transformed fallback
        setPortfolioData(transformData(fallbackData));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { portfolioData, loading };
};

export default usePortfolioData;
