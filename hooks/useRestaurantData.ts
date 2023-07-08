import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Restaurant } from "../types";

const useRestaurantData = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCachedRestaurants = async () => {
      try {
        const cachedRestaurants = await getCachedRestaurants();
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
      const response = await axios.get<Restaurant[]>(
        "https://private-anon-a47a6a7637-pizzaapp.apiary-mock.com/restaurants/"
      );
      setRestaurants(response.data);
      cacheRestaurants(response.data);
    } catch (error) {
      setError(error as Error);
    }
  };

  const cacheRestaurants = async (data: Restaurant[]) => {
    const cacheExpiry = new Date().getTime() + 60 * 60 * 1000; // 1 hour
    const cachedData = {
      data,
      expiry: cacheExpiry,
    };
    await AsyncStorage.setItem("restaurantsCache", JSON.stringify(cachedData));
  };

  const getCachedRestaurants = async (): Promise<Restaurant[] | null> => {
    try {
      const cachedData = await AsyncStorage.getItem("restaurantsCache");
      if (cachedData) {
        const { data, expiry } = JSON.parse(cachedData);
        if (expiry > new Date().getTime()) {
          return data;
        } else {
          await AsyncStorage.removeItem("restaurantsCache");
        }
      }
    } catch (error) {
      console.error("Error retrieving cached data:", error);
    }
    return null;
  };

  return { restaurants, isLoading, error };
};

export default useRestaurantData;
