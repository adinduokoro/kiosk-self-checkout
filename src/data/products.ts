//Typescript interface for a product
export interface Product {
  sku: string;
  name: string;
  priceCents: number;
}

//Mock product catalog
const PRODUCTS: Product[] = [
  { sku: "APPLE001", name: "Red Apple", priceCents: 99 },
  { sku: "BANANA001", name: "Banana", priceCents: 49 },
  { sku: "BREAD001", name: "White Bread", priceCents: 299 },
  { sku: "MILK001", name: "Whole Milk", priceCents: 449 },
  { sku: "EGGS001", name: "Dozen Eggs", priceCents: 399 },
  { sku: "CHICKEN001", name: "Chicken Breast", priceCents: 899 },
  { sku: "RICE001", name: "White Rice", priceCents: 199 },
  { sku: "PASTA001", name: "Spaghetti", priceCents: 149 },
  { sku: "TOMATO001", name: "Tomato", priceCents: 129 },
  { sku: "LETTUCE001", name: "Lettuce", priceCents: 199 },
  { sku: "CHEESE001", name: "Cheddar Cheese", priceCents: 599 },
  { sku: "YOGURT001", name: "Greek Yogurt", priceCents: 149 },
];

//Find product by SKU
export function productBySku(sku: string): Product | undefined {
  return PRODUCTS.find((p) => p.sku === sku.toUpperCase());
}

//Get all products
export function getAllProducts(): Product[] {
  return PRODUCTS;
}
