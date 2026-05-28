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
        // API returns { success: true, data: portfolioData }
        const apiData = response.data.data || response.data;
        
        // Always use API data if response exists (even if partially incomplete)
        // transformData will apply safe defaults for missing fields
        if (apiData) {
          const safeData = {
            name: apiData.name || 'Portfolio',
            hero: {
              tagline: apiData.bio || 'Welcome',
              title: Array.isArray(apiData.title) ? apiData.title : ['Build', 'the Future'],
              roles: Array.isArray(apiData.typewriter) ? apiData.typewriter : ['Developer'],
              description: apiData.bio || 'Creating amazing things',
              resumeUrl: apiData.hero?.resumeUrl || '#',
              imageUrl: apiData.hero?.imageUrl || '/images/profile.jpg'
            },
            about: {
              imageUrl: apiData.about?.imageUrl || '/images/profile.jpg',
              quote: apiData.about?.quote || 'I build intelligent systems from neurons to APIs.',
              title: apiData.about?.title || 'About Me',
              description: apiData.about || 'Creating amazing things',
              stats: Array.isArray(apiData.about?.stats) ? apiData.about.stats : [],
              education: Array.isArray(apiData.education) ? apiData.education : []
            },
            social: {
              github: apiData.social?.github || '#',
              linkedin: apiData.social?.linkedin || '#',
              email: apiData.social?.email || 'contact@example.com',
              whatsapp: apiData.social?.whatsapp || '',
              phone: apiData.social?.phone || ''
            },
            skills: {
              languages: Array.isArray(apiData.skills?.languages) ? apiData.skills.languages : [],
              frontend: Array.isArray(apiData.skills?.frontend) ? apiData.skills.frontend : [],
              backend: Array.isArray(apiData.skills?.backend) ? apiData.skills.backend : [],
              ai_ml: Array.isArray(apiData.skills?.ai_ml) ? apiData.skills.ai_ml : [],
              tools: Array.isArray(apiData.skills?.tools) ? apiData.skills.tools : []
            },
            projects: Array.isArray(apiData.projects) ? apiData.projects : [],
            certifications: Array.isArray(apiData.certifications) ? apiData.certifications : [],
            achievements: Array.isArray(apiData.achievements) ? apiData.achievements : [],
            workshops: Array.isArray(apiData.workshops) ? apiData.workshops : [],
            contact: {
              email: apiData.contact?.email || 'contact@example.com',
              phone: apiData.contact?.phone || '+1 (555) 000-0000'
            },
            videoResume: apiData.videoResume || null
          };
          console.log("✅ API data loaded successfully:", safeData);
          setPortfolioData(safeData);
        } else {
          // If API returns null/undefined, use fallback
          console.log("📦 No API data, using fallback from db.json");
          setPortfolioData(transformData(fallbackData));
        }
      } catch (error) {
        console.warn("⚠️ API fetch failed, using fallback data:", error.message);
        // If API call fails completely, use transformed fallback with complete defaults
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
