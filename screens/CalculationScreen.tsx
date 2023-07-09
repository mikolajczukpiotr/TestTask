import React, { useState, useEffect, useMemo } from "react";
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
  const { restaurants, isLoading: restaurantLoading } = useRestaurantData();
  const {
    menu,
    isLoading: menuLoading,
    uniqueCategories,
  } = useMenuData(selectedRestaurant);
  const filteredMenu = useMemo(
    () => menu.filter((product) => product.category === selectedCategory),
    [menu, selectedCategory]
  );

  useEffect(() => {
    // Clear selected category and product when restaurant changes
    setSelectedCategory("");
    setSelectedProduct("");
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
          data={uniqueCategories(menu)}
          title="category"
          isDisabled={!selectedRestaurant || restaurantLoading}
        />
        <Select
          setSelected={handleProductChange}
          selected={selectedProduct}
          data={filteredMenu}
          title="product"
          isDisabled={!selectedCategory || menuLoading}
        />
        <OrderList
          selectedRestaurant={selectedRestaurant}
          selectedProduct={selectedProduct}
          restaurants={restaurants}
          menu={filteredMenu}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default CalculationScreen;
