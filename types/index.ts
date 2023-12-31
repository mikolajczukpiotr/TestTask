export type Restaurant = {
  id: number;
  name: string;
  address1: string;
  address2: string;
  latitude: number;
  longitude: number;
};

export type Menu = {
  id: number;
  category: string;
  name: string;
  topping?: string[];
  price: number;
  rank?: number;
};

export type Order = {
  restaurant: string;
  product: string;
  price: number;
};
