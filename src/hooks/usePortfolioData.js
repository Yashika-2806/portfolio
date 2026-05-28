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
      tagline: rawData.tagline || 'Welcome',
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
        const apiData = response.data.data || response.data;
        
        console.log("📡 Raw API Response:", apiData);
        
        // Use API data but fill missing/empty arrays from fallback db.json
        const finalData = {
          name: apiData.name || fallbackData.name || 'Portfolio',
          hero: {
            tagline: apiData.tagline || fallbackData.tagline || 'Welcome',
            title: (Array.isArray(apiData.title) && apiData.title.length > 0) 
              ? apiData.title 
              : (fallbackData.typewriter && fallbackData.typewriter.length > 0 ? fallbackData.typewriter : ['Build', 'the Future']),
            roles: (Array.isArray(apiData.typewriter) && apiData.typewriter.length > 0) 
              ? apiData.typewriter 
              : (fallbackData.typewriter && fallbackData.typewriter.length > 0 ? fallbackData.typewriter : ['Developer']),
            description: apiData.bio || fallbackData.bio || 'Creating amazing things',
            resumeUrl: apiData.hero?.resumeUrl || '#',
            imageUrl: apiData.hero?.imageUrl || '/images/profile.jpg'
          },
          about: {
            imageUrl: apiData.about?.imageUrl || '/images/profile.jpg',
            quote: apiData.about?.quote || 'I build intelligent systems from neurons to APIs.',
            title: apiData.about?.title || 'About Me',
            description: apiData.about || fallbackData.about || 'Creating amazing things',
            stats: (Array.isArray(apiData.about?.stats) && apiData.about.stats.length > 0)
              ? apiData.about.stats
              : (Array.isArray(fallbackData.stats) ? fallbackData.stats : []),
            education: (Array.isArray(apiData.education) && apiData.education.length > 0)
              ? apiData.education
              : (Array.isArray(fallbackData.education) ? fallbackData.education : [])
          },
          social: {
            github: apiData.social?.github || fallbackData.social?.github || '#',
            linkedin: apiData.social?.linkedin || fallbackData.social?.linkedin || '#',
            email: apiData.social?.email || fallbackData.social?.email || 'contact@example.com',
            whatsapp: apiData.social?.whatsapp || fallbackData.social?.whatsapp || '',
            phone: apiData.social?.phone || fallbackData.social?.phone || ''
          },
          skills: {
            languages: (Array.isArray(apiData.skills?.languages) && apiData.skills.languages.length > 0)
              ? apiData.skills.languages
              : (Array.isArray(fallbackData.skills?.languages) ? fallbackData.skills.languages : []),
            frontend: (Array.isArray(apiData.skills?.frontend) && apiData.skills.frontend.length > 0)
              ? apiData.skills.frontend
              : (Array.isArray(fallbackData.skills?.frontend) ? fallbackData.skills.frontend : []),
            backend: (Array.isArray(apiData.skills?.backend) && apiData.skills.backend.length > 0)
              ? apiData.skills.backend
              : (Array.isArray(fallbackData.skills?.backend) ? fallbackData.skills.backend : []),
            ai_ml: (Array.isArray(apiData.skills?.ai_ml) && apiData.skills.ai_ml.length > 0)
              ? apiData.skills.ai_ml
              : (Array.isArray(fallbackData.skills?.ai_ml) ? fallbackData.skills.ai_ml : []),
            tools: (Array.isArray(apiData.skills?.tools) && apiData.skills.tools.length > 0)
              ? apiData.skills.tools
              : (Array.isArray(fallbackData.skills?.tools) ? fallbackData.skills.tools : [])
          },
          projects: (Array.isArray(apiData.projects) && apiData.projects.length > 0)
            ? apiData.projects
            : (Array.isArray(fallbackData.projects) ? fallbackData.projects : []),
          certifications: (Array.isArray(apiData.certifications) && apiData.certifications.length > 0)
            ? apiData.certifications
            : (Array.isArray(fallbackData.certifications) ? fallbackData.certifications : []),
          achievements: (Array.isArray(apiData.achievements) && apiData.achievements.length > 0)
            ? apiData.achievements
            : (Array.isArray(fallbackData.achievements) ? fallbackData.achievements : []),
          workshops: (Array.isArray(apiData.workshops) && apiData.workshops.length > 0)
            ? apiData.workshops
            : (Array.isArray(fallbackData.workshops) ? fallbackData.workshops : []),
          contact: {
            email: apiData.contact?.email || fallbackData.contact?.email || 'contact@example.com',
            phone: apiData.contact?.phone || fallbackData.contact?.phone || '+1 (555) 000-0000'
          },
          videoResume: apiData.videoResume || null
        };
        
        console.log("✅ FINAL DATA (merged with fallback):", {
          projectsLength: finalData.projects.length,
          certificationsLength: finalData.certifications.length,
          achievementsLength: finalData.achievements.length,
          workshopsLength: finalData.workshops.length,
          skillsCategories: Object.keys(finalData.skills).length
        });
        
        setPortfolioData(finalData);
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
