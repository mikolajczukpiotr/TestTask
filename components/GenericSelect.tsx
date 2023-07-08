import React, { useState } from "react";
import { Select, View, Text } from "native-base";
import useRestaurantData from "../hooks/useRestaurantData";
import { Restaurant, Menu } from "../types";

const GenericSelect = ({
  data,
  setSelected,
  selected,
  title,
  isDisabled = false,
}: {
  data: (Restaurant | Menu | string)[];
  setSelected: (selectedId: string) => void;
  selected: string | undefined;
  title: string;
  isDisabled?: boolean;
}) => {
  return (
    <View my="2">
      <Select
        selectedValue={selected}
        onValueChange={setSelected}
        placeholder={`Select ${title}`}
        isDisabled={isDisabled}
      >
        {data.map((item, key) => (
          <Select.Item
            key={key}
            label={typeof item === "object" ? item.name : item}
            value={typeof item === "object" ? item.id.toString() : item}
          />
        ))}
      </Select>
    </View>
  );
};

export default GenericSelect;
