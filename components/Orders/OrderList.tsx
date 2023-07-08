import React, { useState } from "react";
import { Button, FlatList, Text, View, Input } from "native-base";
import { Restaurant, Menu, Order } from "../../types";
import OrderItem from "./OrderItem";

const OrderList = ({
  restaurants,
  menu,
  selectedRestaurant,
  selectedProduct,
}: {
  restaurants: Restaurant[];
  menu: Menu[];
  selectedRestaurant: string | undefined;
  selectedProduct: string | undefined;
}) => {
  const [orderList, setOrderList] = useState<Order[]>([]);

  const handleCreateOrder = () => {
    if (selectedRestaurant && selectedProduct) {
      const selectedRestaurantName = restaurants.find(
        (restaurant) => restaurant.id === Number(selectedRestaurant)
      )?.name;
      const selectedProductName = menu.find(
        (product) => product.id.toString() === selectedProduct
      )?.name;
      const selectedProductPrice = menu.find(
        (product) => product.id.toString() === selectedProduct
      )?.price;

      const newOrder: Order = {
        restaurant: selectedRestaurantName || "",
        product: selectedProductName || "",
        price: selectedProductPrice || 0,
      };

      setOrderList((prevOrderList) => [...prevOrderList, newOrder]);
    }
  };

  const handleRemoveOrder = (order: Order) => {
    setOrderList((prevOrderList) => prevOrderList.filter((o) => o !== order));
  };

  const handlePriceChange = (order: Order, price: number | string) => {
    const numericPrice = parseFloat(price.toString());
    if (isNaN(numericPrice)) {
      return;
    }

    setOrderList((prevOrderList) =>
      prevOrderList.map((o) => {
        if (o === order) {
          return { ...o, price: numericPrice };
        }
        return o;
      })
    );
  };

  const uniqueRestaurants = [
    ...new Set(orderList.map((order) => order.restaurant)),
  ];

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    orderList.forEach((order) => {
      totalPrice += order.price;
    });
    return totalPrice;
  };

  return (
    <>
      <Button my="2" onPress={handleCreateOrder} disabled={!selectedProduct}>
        Create Order
      </Button>
      <FlatList
        data={uniqueRestaurants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View>
            <Text style={{ fontWeight: "bold" }}>{item}</Text>
            {orderList
              .filter((order) => order.restaurant === item)
              .map((order, index) => (
                <OrderItem
                  key={index}
                  order={order}
                  handlePriceChange={handlePriceChange}
                  handleRemoveOrder={handleRemoveOrder}
                />
              ))}
          </View>
        )}
      />
      <View
        flexDirection="row"
        justifyContent="flex-end"
        pb="4"
        alignItems="center"
      >
        <Text fontSize="xl">Summary:</Text>
        <Text fontWeight="700" fontSize="xl">
          $ {calculateTotalPrice()}
        </Text>
      </View>
    </>
  );
};

export default OrderList;
