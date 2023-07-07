import { useEffect, useState } from "react";
import axios from "axios";
import { Restaurant } from "../types";

const useRestaurantData = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get<Restaurant[]>(
        "https://private-anon-a47a6a7637-pizzaapp.apiary-mock.com/restaurants/"
      );
      setRestaurants(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error as Error);
      setIsLoading(false);
    }
  };

  return { restaurants, isLoading, error };
};

export default useRestaurantData;
