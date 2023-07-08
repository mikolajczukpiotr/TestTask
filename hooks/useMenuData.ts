import { useEffect, useState } from "react";
import axios from "axios";
import { Menu } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useMenuData = () => {
  const [menu, setMenu] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<Menu[]>(
          "https://private-anon-a47a6a7637-pizzaapp.apiary-mock.com/restaurants/menu"
        );
        setMenu(response.data);
        setIsLoading(false);
        cacheMenu(response.data);
      } catch (error) {
        setError(error as Error);
        setIsLoading(false);
      }
    };

    const getCachedMenu = async (): Promise<Menu[] | null> => {
      try {
        const cachedData = await AsyncStorage.getItem("menuCache");
        if (cachedData) {
          const { data } = JSON.parse(cachedData);
          return data;
        }
      } catch (error) {
        console.error("Error retrieving cached data:", error);
      }
      return null;
    };

    const cacheMenu = async (menuData: Menu[]) => {
      try {
        const cachedData = JSON.stringify({ data: menuData });
        await AsyncStorage.setItem("menuCache", cachedData);
      } catch (error) {
        console.error("Error caching data:", error);
      }
    };

    const getCachedMenuData = async () => {
      const cachedMenu = await getCachedMenu();
      if (cachedMenu) {
        setMenu(cachedMenu);
        setIsLoading(false);
      } else {
        fetchMenu();
      }
    };

    getCachedMenuData();
  }, []);

  return { menu, isLoading, error };
};

export default useMenuData;
