import AsyncStorage from "@react-native-async-storage/async-storage";

export const RESTAURANT_DATA_CACHE_KEY = "restaurantsCache";
export const MENU_DATA_CACHE_KEY = "menuCache";

export type CacheKey =
  | typeof RESTAURANT_DATA_CACHE_KEY
  | `${typeof MENU_DATA_CACHE_KEY}-${string | undefined}`;

export const useCache = () => {
  const cacheData = async (data: any, key: CacheKey) => {
    const cacheExpiry = new Date().getTime() + 60 * 60 * 1000; // 1 hour
    const cachedData = {
      data,
      expiry: cacheExpiry,
    };
    await AsyncStorage.setItem(key, JSON.stringify(cachedData));
  };

  const getCachedData = async (key: CacheKey): Promise<any | null> => {
    try {
      const cachedData = await AsyncStorage.getItem(key);
      if (cachedData) {
        const { data, expiry } = JSON.parse(cachedData);
        if (expiry < new Date().getTime()) {
          return data;
        } else {
          await AsyncStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.error("Error retrieving cached data:", error);
    }
    return null;
  };

  return { cacheData, getCachedData };
};
