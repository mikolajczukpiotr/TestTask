import React, { useState } from "react";
import { Select as NativeBaseSelect, View, Text } from "native-base";
import { Restaurant, Menu } from "../types";

const Select = ({
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
      <NativeBaseSelect
        selectedValue={selected}
        onValueChange={setSelected}
        placeholder={`Select ${title}`}
        isDisabled={isDisabled}
        fontSize={18}
      >
        {data.map((item, key) => (
          <NativeBaseSelect.Item
            key={key}
            label={typeof item === "object" ? item.name : item}
            value={typeof item === "object" ? item.id.toString() : item}
          />
        ))}
      </NativeBaseSelect>
    </View>
  );
};

export default Select;
