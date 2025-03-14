import { CartRepositoryType } from "../../types/repository.type";
import * as Repository from "../../repository/cart.repository";
import { CreateCart } from "../cart.service";

describe("cartService", () => {
  let repo: CartRepositoryType;
  beforeEach(() => {
    repo = Repository.CartRepository;
  });

  it("should return correct data while creating cart", async () => {
    const mockCart = {
      item: "Smart Phone",
      price: 1200,
    };

    jest.spyOn(repo, "create").mockImplementationOnce(() => {
      return Promise.resolve({
        message: "fake response from cart repository",
        input: mockCart,
      });
    });

    const response = await CreateCart(mockCart, repo);

    expect(response).toEqual({ message: "fake response from cart repository", input: mockCart });
  });

  afterEach(() => {
    repo = {} as CartRepositoryType;
  });
});
