const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index").app;

require("dotenv").config();
beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

describe("POST /createProduct", () => {
    it("should create a product", async () => {
      const res = await request(app).post("/createProduct").send({
        name: "electronics",
        price: 3000,
        description: "Electronics items",
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe("electronics");
    });
});

describe("POST /createVariant/:productid", () => {
    it("should create a variant", async () => {
      const res = await request(app).post("/createVariant/65bb9c2432d38538c486d79c").send({
        name :"Checking latest test",
        sku :"69",
        additional_cost:3000,
        stock_count:40
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe("Checking latest test");
    });
});

describe("GET /getAllProduct", () => {
    it("should return all product", async () => {
      const res = await request(app).get(
        "/getAllProduct"
      );
      expect(res.statusCode).toBe(200);
    });
});

describe("GET /getProductVariants/:productid", () => {
    it("should return all Variants of particular product", async () => {
      const res = await request(app).get(
        "/getProductVariants/65bb9c2432d38538c486d79c"
      );
      expect(res.statusCode).toBe(200);
    });
});

describe("GET /search", () => {
    it("should search from products and variants", async () => {
      const res = await request(app).get(
        "/search?q=lap"
      );
      expect(res.statusCode).toBe(200);
    });
});

describe("PUT /updateProduct/:productid", () => {
    it("should update a product", async () => {
      const res = await request(app)
        .put("/updateProduct/65bb9c2432d38538c486d79c")
        .send({
          name: "Updated Products",
          price: 1600,
          description: "Update api",
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.price).toBe(1600);
    });
});

describe("PUT /updatevariant/:variantid", () => {
    it("should update a variant", async () => {
      const res = await request(app)
        .put("/updatevariant/65bb9c4932d38538c486d79e")
        .send({
            name :"New variant",
            additional_cost:6080,
            stock_count:40
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe("New variant");
    });
});

describe("DELETE /deleteVariant/:variantid", () => {
    it("should delete a variant", async () => {
      const res = await request(app).delete(
        "/deleteVariant/65bba587c2b099b3c88b1222"
      );
      expect(res.statusCode).toBe(200);
    });
});

describe("DELETE /deleteProduct/:productid", () => {
    it("should delete a product", async () => {
      const res = await request(app).delete(
        "/deleteProduct/65bba504b32cfdf3bf36dffb"
      );
      expect(res.statusCode).toBe(200);
    });
});











afterEach(async () => {
    await mongoose.connection.close();
});