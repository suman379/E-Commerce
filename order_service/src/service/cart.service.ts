import { CartRequestInput } from "../dto/cartrequest.dto";
import { CartRepositoryType } from "../types/repository.type";
import { NotFoundError } from "../utils";
import { GetProductDetails } from "../utils/broker";

export const CreateCart = async (input: CartRequestInput, repo: CartRepositoryType) => {
  // Make a call to our catalog micro service
  //Sync call
  const product = await GetProductDetails(input.productId);
  if (product.stock < input.qty) {
    throw new NotFoundError("product is out of stock");
  }
  //const data = await repo.create(input);
  return product;
};

export const GetCart = async (input: any, repo: CartRepositoryType) => {
  const data = await repo.find(input);
  return data;
};

export const EditCart = async (input: any, repo: CartRepositoryType) => {
  const data = await repo.update(input);
  return data;
};

export const DeleteCart = async (input: any, repo: CartRepositoryType) => {
  const data = await repo.delete(input);
  return data;
};
