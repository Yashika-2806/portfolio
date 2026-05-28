import { useState, useEffect } from 'react';
import axios from 'axios';
import fallbackData from '../data/db.json';

// Complete default portfolio data structure with safe arrays everywhere
const DEFAULT_PORTFOLIO_DATA = {
  name: 'Portfolio',
  hero: {
    tagline: 'Welcome',
    title: ['Build', 'the Future'],
    roles: ['Developer'],
    description: 'Creating amazing things',
    resumeUrl: '#',
    imageUrl: '/images/profile.jpg'
  },
  about: {
    imageUrl: '/images/profile.jpg',
    quote: 'Welcome to my portfolio',
    title: 'About Me',
    description: 'Creating amazing things',
    stats: [],
    education: []
  },
  social: {
    github: '#',
    linkedin: '#',
    email: 'contact@example.com'
  },
  skills: {
    languages: [],
    frontend: [],
    backend: [],
    ai_ml: [],
    tools: []
  },
  projects: [],
  certifications: [],
  achievements: [],
  workshops: [],
  contact: {
    email: 'contact@example.com',
    phone: '+1 (555) 000-0000'
  },
  videoResume: null
};

// Transform raw db.json structure into the expected component structure with safe defaults
const transformData = (rawData) => {
  if (!rawData) return DEFAULT_PORTFOLIO_DATA;

  return {
    name: rawData.name || 'Portfolio',
    hero: {
      tagline: rawData.bio || 'Welcome',
      title: Array.isArray(rawData.title) ? rawData.title : ['Build', 'the Future'],
      roles: Array.isArray(rawData.typewriter) ? rawData.typewriter : ['Developer'],
      description: rawData.bio || 'Creating amazing things',
      resumeUrl: '#',
      imageUrl: '/images/profile.jpg'
    },
    about: {
      imageUrl: '/images/profile.jpg',
      quote: 'I build intelligent systems from neurons to APIs.',
      title: 'About Me',
      description: rawData.about || 'Creating amazing things',
      stats: Array.isArray(rawData.stats) ? rawData.stats : [],
      education: Array.isArray(rawData.education) ? rawData.education : []
    },
    social: {
      github: rawData.social?.github || '#',
      linkedin: rawData.social?.linkedin || '#',
      email: rawData.social?.email || 'contact@example.com'
    },
    skills: {
      languages: Array.isArray(rawData.skills?.languages) ? rawData.skills.languages : [],
      frontend: Array.isArray(rawData.skills?.frontend) ? rawData.skills.frontend : [],
      backend: Array.isArray(rawData.skills?.backend) ? rawData.skills.backend : [],
      ai_ml: Array.isArray(rawData.skills?.ai_ml) ? rawData.skills.ai_ml : [],
      tools: Array.isArray(rawData.skills?.tools) ? rawData.skills.tools : []
    },
    projects: Array.isArray(rawData.projects) ? rawData.projects : [],
    certifications: Array.isArray(rawData.certifications) ? rawData.certifications : [],
    achievements: Array.isArray(rawData.achievements) ? rawData.achievements : [],
    workshops: Array.isArray(rawData.workshops) ? rawData.workshops : [],
    contact: {
      email: rawData.contact?.email || 'contact@example.com',
      phone: rawData.contact?.phone || '+1 (555) 000-0000'
    },
    videoResume: rawData.videoResume || null
  };
};

const usePortfolioData = () => {
  const [portfolioData, setPortfolioData] = useState(DEFAULT_PORTFOLIO_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api');
        // API now returns { success: true, data: portfolioData }
        const apiData = response.data.data || response.data;
        
        // If API returns valid data with required structure, use it
        if (apiData && apiData.hero && Object.keys(apiData).length > 0) {
          // Ensure all required arrays are present and valid
          const safeData = {
            ...DEFAULT_PORTFOLIO_DATA,
            ...apiData,
            hero: {
              ...DEFAULT_PORTFOLIO_DATA.hero,
              ...apiData.hero,
              title: Array.isArray(apiData?.hero?.title) ? apiData.hero.title : DEFAULT_PORTFOLIO_DATA.hero.title,
              roles: Array.isArray(apiData?.hero?.roles) ? apiData.hero.roles : DEFAULT_PORTFOLIO_DATA.hero.roles
            },
            about: {
              ...DEFAULT_PORTFOLIO_DATA.about,
              ...apiData.about,
              stats: Array.isArray(apiData?.about?.stats) ? apiData.about.stats : [],
              education: Array.isArray(apiData?.about?.education) ? apiData.about.education : []
            },
            projects: Array.isArray(apiData?.projects) ? apiData.projects : [],
            skills: {
              ...DEFAULT_PORTFOLIO_DATA.skills,
              ...(apiData?.skills || {})
            },
            certifications: Array.isArray(apiData?.certifications) ? apiData.certifications : [],
            achievements: Array.isArray(apiData?.achievements) ? apiData.achievements : [],
            workshops: Array.isArray(apiData?.workshops) ? apiData.workshops : [],
            contact: {
              ...DEFAULT_PORTFOLIO_DATA.contact,
              ...apiData.contact
            },
            social: {
              ...DEFAULT_PORTFOLIO_DATA.social,
              ...apiData.social
            }
          };
          setPortfolioData(safeData);
        } else {
          // If API returns incomplete data, use transformed fallback
          console.log("API data is incomplete or missing, using fallback.");
          setPortfolioData(transformData(fallbackData));
        }
      } catch (error) {
        console.error("Failed to fetch data from API, using fallback.", error);
        // If API call fails, use transformed fallback with complete defaults
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
