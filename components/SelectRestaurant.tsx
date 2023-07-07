
import React, { useState } from "react";
import useRestaurantData from "./useRestaurantData";
import { Select, View, Text } from "native-base";

const SelectRestaurant = ({
  setSelectedRestaurant,
  selectedRestaurant,
}: {
  setSelectedRestaurant: (selectedRestaurantId: string) => void;
  selectedRestaurant: string | undefined;
}) => {
  const { restaurants, isLoading, error } = useRestaurantData();

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
        onValueChange={setSelectedRestaurant}
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
