import { useEffect, useState } from "react";
import axios from "axios";
import { Restaurant } from "../types";
import { RESTAURANT_DATA_CACHE_KEY, useCache } from "./useCache";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const useRestaurantData = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { cacheData, getCachedData } = useCache();

  useEffect(() => {
    const fetchCachedRestaurants = async () => {
      try {
        const cachedRestaurants = await getCachedData(
          RESTAURANT_DATA_CACHE_KEY
        );
        if (cachedRestaurants) {
          setRestaurants(cachedRestaurants);
        } else {
          await fetchRestaurants();
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCachedRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get<Restaurant[]>(`${apiUrl}/restaurants/`);
      setRestaurants(response.data);
      cacheData(response.data, RESTAURANT_DATA_CACHE_KEY);
    } catch (error) {
      setError(error as Error);
    }
  };

  return { restaurants, isLoading, error };
};

export default useRestaurantData;
