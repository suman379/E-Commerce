import { CartLineItem } from "../db/schema";
import { CartEditRequestInput, CartRequestInput } from "../dto/cartrequest.dto";
import { CartRepositoryType } from "../repository/cart.repository";
import { NotFoundError } from "../utils";
import { GetProductDetails } from "../utils/broker";

export const CreateCart = async (input: CartRequestInput, repo: CartRepositoryType) => {
  // Make a call to our catalog micro service
  //Sync call
  const product = await GetProductDetails(input.productId);
  if (product.stock < input.qty) {
    throw new NotFoundError("product is out of stock");
  }
  // find if the product is already in cart
  const lineItem = await repo.findCartByProductId(input.customerId, input.productId);
  if (lineItem) {
    return repo.updateCart(lineItem.id, lineItem.qty + input.qty);
  }

  return await repo.createCart(input.customerId, {
    productId: product.id,
    price: product.price.toString(),
    qty: input.qty,
    itemName: product.name,
    variant: product.variant,
  } as CartLineItem);
};

export const GetCart = async (id: number, repo: CartRepositoryType) => {
  const cart = await repo.findCart(id);
  if (!cart) {
    throw new NotFoundError("cart does not exist");
  }
  return cart;
};

export const EditCart = async (input: CartEditRequestInput, repo: CartRepositoryType) => {
  const data = await repo.updateCart(input.id, input.qty);
  return data;
};

export const DeleteCart = async (id: number, repo: CartRepositoryType) => {
  const data = await repo.deleteCart(id);
  return data;
};
