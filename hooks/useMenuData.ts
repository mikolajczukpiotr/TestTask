import { useEffect, useState } from "react";
import axios from "axios";
import { Menu } from "../types";
import { CacheKey, MENU_DATA_CACHE_KEY, useCache } from "./useCache";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const useMenuData = (restaurantId: string | undefined) => {
  const [menu, setMenu] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { cacheData, getCachedData } = useCache();
  const cacheKey = `${MENU_DATA_CACHE_KEY}-${restaurantId}` as CacheKey;

  useEffect(() => {
    const fetchCachedMenu = async () => {
      try {
        const cachedMenu = await getCachedData(cacheKey);
        if (cachedMenu) {
          setMenu(cachedMenu);
        } else {
          await fetchMenu();
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCachedMenu();
  }, [restaurantId]);

  const fetchMenu = async () => {
    if (!restaurantId) return;
    try {
      setIsLoading(true);
      const { data } = await axios.get<Menu[]>(
        `${apiUrl}/restaurants/${restaurantId}/menu`
      );
      setMenu(data);
      cacheData(data, cacheKey);
      setIsLoading(false);
    } catch (error) {
      setError(error as Error);
      setIsLoading(false);
    }
  };

  const uniqueCategories = (menuList: Menu[]) =>
    menuList.reduce<string[]>((categories, item) => {
      if (!categories.includes(item.category)) {
        categories.push(item.category);
      }
      return categories;
    }, []);

  return { menu, uniqueCategories, isLoading, error };
};

export default useMenuData;
