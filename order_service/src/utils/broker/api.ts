import axios from "axios";
import { APIError } from "../error";
import { logger } from "../logger";
import { Product } from "../../dto/product.dto";
const CATALOG_BASE_URL = process.env.CATALOG_BASE_URL || "http://localhost:9001";
export const GetProductDetails = async (productId: number) => {
  try {
    const response = await axios.get(`${CATALOG_BASE_URL}/products/${productId}`);
    const product = response.data as Product;
    return product;
  } catch (error) {
    throw new APIError("product does not exist");
  }
};
