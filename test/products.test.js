import { expect } from "chai";

import supertest from "supertest";
import app from "../src/app.js";

import productModel from "../src/DAO/models/product.model.js";

process.env.NODE_ENV = "test";

const requester = supertest(app);

describe("test /api/products routes", () => {


  describe("GET methods", async () => {
    it("deberia devolver una lista con todos los productos", async () => {
      try {
        let mockProduct = {
          title: "productoPrueba",
          description: "este es un producto de prueba",
          code: "a123",
          price: 1000,
          status: true,
          owner: "admin",
          stock: 1,
          cat: "producto",
        };

        const productDB = await productModel.create(mockProduct);

        const response = await requester.get("/api/products");
        expect(response.status).to.equal(200);

        
       const deletedProduct = await productModel.findByIdAndDelete(productDB._id);
      } catch (error) {
        console.error("ha ocurrido un error al ejecutar la prueba: ", error);
      }
    });
  });

  describe("POST methods", async () => {});

  describe("PUT method", async () => {});

  describe("DELETE method", async () => {});
});
