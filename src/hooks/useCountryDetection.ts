import { useState, useEffect } from "react";

const CACHE_KEY = "country_data";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CachedData {
  country: string;
  timestamp: number;
}

export const useCountryDetection = () => {
  const [country, setCountry] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectCountry = async () => {
      try {
        // Check cache first
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const parsed: CachedData = JSON.parse(cachedData);
          const isExpired = Date.now() - parsed.timestamp > CACHE_DURATION;
          
          if (!isExpired) {
            setCountry(parsed.country);
            setIsLoading(false);
            return;
          }
        }

        // Fetch new data if cache is expired or doesn't exist
        const response = await fetch(
          `http://api.ipapi.com/api/check?access_key=4a2544372186988a8966b34dd0ee0746`
        );
        const data = await response.json();

        if (data.country_name) {
          const newData: CachedData = {
            country: data.country_name,
            timestamp: Date.now(),
          };
          localStorage.setItem(CACHE_KEY, JSON.stringify(newData));
          setCountry(data.country_name);
        }
      } catch (error) {
        console.error("Error detecting country:", error);
      } finally {
        setIsLoading(false);
      }
    };

    detectCountry();
  }, []);

  return { country, isLoading };
};