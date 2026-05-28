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
    resumeUrl: '/resume/Yashika%20Sapra.pdf',
    imageUrl: '/images/professional image.jpeg'
  },
  about: {
    imageUrl: '/images/professional image.jpeg',
    quote: 'Welcome to my portfolio',
    title: 'About Me',
    description: 'Creating amazing things',
    stats: [],
    education: []
  },
  social: {
    github: '#',
    linkedin: '#',
    email: 'yashika2865@gmail.com',
    phone: '6396951934',
    address: 'Mathura, Uttar Pradesh, India'
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
    name: 'Yashika Sapra',
    email: 'yashika2865@gmail.com',
    phone: '6396951934',
    address: 'Mathura, Uttar Pradesh, India'
  },
  videoResume: null
};

const mergeByTitle = (primaryItems, fallbackItems) => {
  const primary = Array.isArray(primaryItems) ? primaryItems : [];
  const fallback = Array.isArray(fallbackItems) ? fallbackItems : [];
  const fallbackByTitle = new Map(
    fallback.map((item) => [String(item?.title || item?.name || '').toLowerCase(), item])
  );
  const seen = new Set();

  const merged = primary.map((item) => {
    const key = String(item?.title || item?.name || '').toLowerCase();
    const fallbackItem = fallbackByTitle.get(key);
    const images = [
      ...(Array.isArray(item?.images) ? item.images : []),
      ...(Array.isArray(fallbackItem?.images) ? fallbackItem.images : []),
    ].filter((image, index, allImages) => image && allImages.indexOf(image) === index);

    seen.add(key);
    return {
      ...(fallbackItem || {}),
      ...item,
      imageUrl: item?.imageUrl || item?.image || fallbackItem?.imageUrl,
      image: item?.image || fallbackItem?.image,
      images: images.length > 0 ? images : undefined,
      tags: Array.isArray(item?.tags) && item.tags.length > 0 ? item.tags : fallbackItem?.tags,
    };
  });

  fallback.forEach((item) => {
    const key = String(item?.title || item?.name || '').toLowerCase();
    if (!seen.has(key)) merged.push(item);
  });

  return merged;
};

// Transform raw db.json structure into the expected component structure with safe defaults
const transformData = (rawData) => {
  if (!rawData) return DEFAULT_PORTFOLIO_DATA;

  return {
    name: rawData.name || 'Portfolio',
    hero: {
      tagline: rawData.tagline || 'Welcome',
      title: Array.isArray(rawData.title) ? rawData.title : ['Hi, I am', rawData.name || 'Yashika Sapra'],
      roles: Array.isArray(rawData.typewriter) ? rawData.typewriter : ['Developer'],
      description: rawData.bio || 'Creating amazing things',
      resumeUrl: rawData.hero?.resumeUrl || rawData.resumeUrl || '/resume/Yashika%20Sapra.pdf',
      imageUrl: '/images/professional image.jpeg'
    },
    about: {
      imageUrl: '/images/professional image.jpeg',
      quote: 'I build intelligent systems from neurons to APIs.',
      title: 'About Me',
      description: rawData.about || 'Creating amazing things',
      stats: Array.isArray(rawData.stats) ? rawData.stats : [],
      education: Array.isArray(rawData.education) ? rawData.education : []
    },
    social: {
      github: rawData.social?.github || '#',
      linkedin: rawData.social?.linkedin || '#',
      email: rawData.social?.email || 'yashika2865@gmail.com',
      phone: rawData.social?.phone || '6396951934',
      address: rawData.social?.address || 'Mathura, Uttar Pradesh, India'
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
      name: rawData.contact?.name || rawData.name || 'Yashika Sapra',
      email: rawData.contact?.email || rawData.social?.email || 'yashika2865@gmail.com',
      phone: rawData.contact?.phone || rawData.social?.phone || '6396951934',
      address: rawData.contact?.address || rawData.social?.address || 'Mathura, Uttar Pradesh, India'
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
              : (Array.isArray(fallbackData.title) && fallbackData.title.length > 0 ? fallbackData.title : ['Hi, I am', fallbackData.name || 'Yashika Sapra']),
            roles: (Array.isArray(apiData.typewriter) && apiData.typewriter.length > 0) 
              ? apiData.typewriter 
              : (fallbackData.typewriter && fallbackData.typewriter.length > 0 ? fallbackData.typewriter : ['Developer']),
            description: apiData.bio || fallbackData.bio || 'Creating amazing things',
            resumeUrl: apiData.hero?.resumeUrl || apiData.resumeUrl || fallbackData.hero?.resumeUrl || fallbackData.resumeUrl || '/resume/Yashika%20Sapra.pdf',
            imageUrl: apiData.hero?.imageUrl || '/images/professional image.jpeg'
          },
          about: {
            imageUrl: apiData.about?.imageUrl || '/images/professional image.jpeg',
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
            email: apiData.social?.email || fallbackData.social?.email || 'yashika2865@gmail.com',
            whatsapp: apiData.social?.whatsapp || fallbackData.social?.whatsapp || '',
            phone: apiData.social?.phone || fallbackData.social?.phone || '',
            address: apiData.social?.address || fallbackData.social?.address || 'Mathura, Uttar Pradesh, India'
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
          projects: mergeByTitle(apiData.projects, fallbackData.projects),
          certifications: mergeByTitle(apiData.certifications, fallbackData.certifications),
          achievements: mergeByTitle(apiData.achievements, fallbackData.achievements),
          workshops: (Array.isArray(apiData.workshops) && apiData.workshops.length > 0)
            ? apiData.workshops
            : (Array.isArray(fallbackData.workshops) ? fallbackData.workshops : []),
          contact: {
            name: apiData.contact?.name || fallbackData.contact?.name || apiData.name || fallbackData.name || 'Yashika Sapra',
            email: apiData.contact?.email || apiData.social?.email || fallbackData.contact?.email || fallbackData.social?.email || 'yashika2865@gmail.com',
            phone: apiData.contact?.phone || apiData.social?.phone || fallbackData.contact?.phone || fallbackData.social?.phone || '6396951934',
            address: apiData.contact?.address || apiData.social?.address || fallbackData.contact?.address || fallbackData.social?.address || 'Mathura, Uttar Pradesh, India'
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
