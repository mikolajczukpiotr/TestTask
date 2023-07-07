export type Restaurant = {
  id: number;
  name: string;
  address1: string;
  address2: string;
  latitude: number;
  longitude: number;
};

export type MenuItem = {
  id: number;
  category: string;
  name: string;
  topping?: string[];
  price: number;
  rank?: number;
};
