import React, { useState, useEffect } from "react";
import { View, Text } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Select from "../components/Select";
import useRestaurantData from "../hooks/useRestaurantData";
import useMenuData from "../hooks/useMenuData";
import OrderList from "../components/Orders/OrderList";
import { KeyboardAvoidingView, Platform } from "react-native";

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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Text fontSize="xl">Create new entry</Text>
        <Select
          setSelected={handleRestaurantChange}
          selected={selectedRestaurant}
          data={restaurants}
          title="restaurant"
        />
        <Select
          setSelected={handleCategoryChange}
          selected={selectedCategory}
          data={categoryList}
          title="category"
          isDisabled={!selectedRestaurant || restaurantLoading}
        />
        <Select
          setSelected={handleProductChange}
          selected={selectedProduct}
          data={menu}
          title="product"
          isDisabled={!selectedCategory || menuLoading}
        />
        <OrderList
          selectedRestaurant={selectedRestaurant}
          selectedProduct={selectedProduct}
          restaurants={restaurants}
          menu={menu}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default CalculationScreen;
