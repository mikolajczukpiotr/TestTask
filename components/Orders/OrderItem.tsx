import React from "react";
import { Order } from "../../types";
import { Button, Input, View, Text } from "native-base";

const OrderItem = ({
  order,
  handlePriceChange,
  handleRemoveOrder,
}: {
  order: Order;
  handlePriceChange: (order: Order, price: number) => void;
  handleRemoveOrder: (order: Order) => void;
}) => {
  return (
    <View
      my="1"
      alignItems="center"
      flexDir="row"
      justifyContent="space-between"
    >
      <Text>{order.product}</Text>
      <View flexDir="row">
        <Input
          value={order.price.toString()}
          w="20"
          mx="2"
          onChangeText={(text) => handlePriceChange(order, Number(text))}
          keyboardType="numeric"
        />
        <Button onPress={() => handleRemoveOrder(order)} mx="2">
          Remove
        </Button>
      </View>
    </View>
  );
};

export default OrderItem;
