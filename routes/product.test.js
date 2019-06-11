const { init } = require("../server");
const ProductServices = require("../services/product-services");

let url = "/products";

describe("Product Endpoints", () => {
  let server;

  beforeAll(async () => {
    server = await init();
  });

  beforeEach(async () => {
    await server.initialize();
  });

  afterEach(async () => {
    await server.stop();
  });

  describe(`GET ${url}`, () => {
    const injectOptions = {
      method: "GET",
      url
    };
    let returnValue = [];
    const mockGetAllTodos = jest.fn().mockReturnValue(returnValue);
    it("Should have status code equal 200", async () => {
      expect.assertions(1);
      ProductServices.getAllProducts = mockGetAllTodos;
      const response = await server.inject(injectOptions);
      expect(response.statusCode).toEqual(200);
    });

    it("Should get all products", async () => {
      // expect.assertions(1);
      returnValue = [
        {
          id: 1,
          type: "pizza",
          categoryID: 1,
          variantIDs: [1],
          name: "Cheese Pizza",
          description: "delicious",
          price: 0,
          variantProducts: [
            {
              key: "size",
              value: "S",
              price: 1000
            }
          ]
        },
        {
          id: 1,
          type: "pizza",
          categoryID: 1,
          variantIDs: [1],
          name: "Salmon Pizza",
          description: "delicious",
          price: 0,
          variantProducts: [
            {
              key: "size",
              value: "S",
              price: 1000
            }
          ]
        }
      ];
      mockGetAllTodos.mockReturnValue(returnValue);
      ProductServices.getAllProducts = mockGetAllTodos;
      const response = await server.inject(injectOptions);
      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.payload)).toMatchObject(returnValue);
    });
  });
});
