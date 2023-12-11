import { faker } from "@faker-js/faker";

faker.location = "es";



export const generateProducts = () => {
  return {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    code: faker.number.int({ min: 100, max: 999 }),
    price: faker.commerce.price({ min: 1000, max: 200000, dec: 0 }),
    stock: faker.number.int({ min: 1, max: 10 }),
    cat: faker.commerce.department(),
  };
};
