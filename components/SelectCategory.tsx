import React, { useState } from "react";
import useMenuData from "./useMenuData";
import { Select, View, Text } from "native-base";

const SelectCategory = ({
  restaurantId,
}: {
  restaurantId: string | undefined;
}) => {
  const { menu, uniqueCategories, isLoading, error } =
    useMenuData(restaurantId);
  const [selectedMenu, setSelectedMenu] = useState<string | undefined>(
    undefined
  );
  const handleRestaurantChange = (value: string) => {
    setSelectedMenu(value);
  };

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View my="2">
      <Select
        selectedValue={selectedMenu}
        onValueChange={handleRestaurantChange}
        placeholder="Select category"
        isDisabled={!restaurantId || isLoading}
      >
        {uniqueCategories.map((category, key) => (
          <Select.Item key={key} label={category} value={category} />
        ))}
      </Select>
    </View>
  );
};
export default SelectCategory;
