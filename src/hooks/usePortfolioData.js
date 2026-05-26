import { useState, useEffect } from 'react';
import axios from 'axios';
import fallbackData from '../data/db.json';

const usePortfolioData = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api');
        if (response.data && Object.keys(response.data).length > 0) {
          setPortfolioData(response.data);
        } else {
          // If API returns no data, use fallback
          setPortfolioData(fallbackData);
        }
      } catch (error) {
        console.error("Failed to fetch data from API, using fallback.", error);
        // If API call fails, use fallback
        setPortfolioData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { portfolioData, loading };
};

export default usePortfolioData;
