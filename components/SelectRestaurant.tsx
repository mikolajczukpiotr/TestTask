import React, { useState } from "react";
import useRestaurantData from "./useRestaurantData";
import { Select, View, Text } from "native-base";

const SelectRestaurant = () => {
  const { restaurants, isLoading, error } = useRestaurantData();
  const [selectedRestaurant, setSelectedRestaurant] = useState<
    string | undefined
  >(undefined);

  const handleRestaurantChange = (value: string) => {
    setSelectedRestaurant(value);
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View my="2">
      <Select
        selectedValue={selectedRestaurant}
        onValueChange={handleRestaurantChange}
        placeholder="Select restaurant"
      >
        {restaurants.map((restaurant) => (
          <Select.Item
            key={restaurant.id}
            label={restaurant.name}
            value={restaurant.id.toString()}
          />
        ))}
      </Select>
    </View>
  );
};

export default SelectRestaurant;
