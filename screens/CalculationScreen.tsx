import { View, Text } from "native-base";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SelectRestaurant from "../components/SelectRestaurant";
import SelectCategory from "../components/SelectCategory";

const CalculationScreen = () => {
  const insets = useSafeAreaInsets();
  const [selectedRestaurant, setSelectedRestaurant] = useState<
    string | undefined
  >(undefined);
  const handleRestaurantChange = (value: string) => {
    setSelectedRestaurant(value.toString());
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
      <SelectRestaurant
        setSelectedRestaurant={handleRestaurantChange}
        selectedRestaurant={selectedRestaurant}
      />
      <SelectCategory restaurantId={selectedRestaurant} />
    </View>
  );
};

export default CalculationScreen;
