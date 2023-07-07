import { useEffect, useState } from "react";
import axios from "axios";
import { MenuItem } from "../types";

const useMenuData = (restaurantId: string | undefined, category?: string) => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchMenu();
  }, [restaurantId, category]);

  const fetchMenu = async () => {
    if (!restaurantId) return;
    try {
      setIsLoading(true);
      const response = await axios.get<MenuItem[]>(
        `https://private-anon-a47a6a7637-pizzaapp.apiary-mock.com/restaurants/${restaurantId}/menu`
      );
      const filteredMenu = category
        ? response.data.filter((item) => item.category === category)
        : response.data;
      setMenu(filteredMenu);
      setIsLoading(false);
    } catch (error) {
      setError(error as Error);
      setIsLoading(false);
    }
  };

  const uniqueCategories = menu.reduce<string[]>((categories, item) => {
    if (!categories.includes(item.category)) {
      categories.push(item.category);
    }
    return categories;
  }, []);

  return { menu, uniqueCategories, isLoading, error };
};

export default useMenuData;
