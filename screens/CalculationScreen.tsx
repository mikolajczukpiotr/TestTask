import React, { useState, useEffect } from "react";
import { View, Text, Select } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GenericSelect from "../components/GenericSelect";
import useRestaurantData from "../hooks/useRestaurantData";
import useMenuData from "../hooks/useMenuData";

const CalculationScreen = () => {
  const insets = useSafeAreaInsets();
  const [selectedRestaurant, setSelectedRestaurant] = useState<
    string | undefined
  >(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>(
    undefined
  );
  const {
    restaurants,
    isLoading: restaurantLoading,
    error: restaurantError,
  } = useRestaurantData();
  const { uniqueCategories: categoryList } = useMenuData(selectedRestaurant);
  const {
    menu,
    isLoading: menuLoading,
    error: menuError,
  } = useMenuData(selectedRestaurant, selectedCategory);

  useEffect(() => {
    // Clear selected category and product when restaurant changes
    setSelectedCategory(undefined);
    setSelectedProduct(undefined);
  }, [selectedRestaurant]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleRestaurantChange = (value: string) => {
    setSelectedRestaurant(value);
  };

  const handleProductChange = (value: string) => {
    setSelectedProduct(value);
  };

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        flex: 1,
      }}
      px="4"
    >
      <Text>Create new entry</Text>
      <GenericSelect
        setSelected={handleRestaurantChange}
        selected={selectedRestaurant}
        data={restaurants}
        title="restaurant"
      />
      <GenericSelect
        setSelected={handleCategoryChange}
        selected={selectedCategory}
        data={categoryList}
        title="category"
        isDisabled={!selectedRestaurant || restaurantLoading }
      />
      <GenericSelect
        setSelected={handleProductChange}
        selected={selectedProduct}
        data={menu}
        title="product"
        isDisabled={!selectedCategory || menuLoading || menuError}
      />
    </View>
  );
};

export default CalculationScreen;
