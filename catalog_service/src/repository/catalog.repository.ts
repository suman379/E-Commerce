import { PrismaClient } from "@prisma/client";
import { ICatalogRepository } from "../interface/catalog.respository.interface";
import { Product } from "../models/product.model";
import { ProductFactory } from "../utils/fixtures";
import { NotFoundError } from "../utils";

export class CatalogRepository implements ICatalogRepository {
  _prismaClient: PrismaClient;
  constructor() {
    this._prismaClient = new PrismaClient();
  }

  async create(data: Product): Promise<Product> {
    return await this._prismaClient.product.create({ data });
  }

  async update(data: Product): Promise<Product> {
    return await this._prismaClient.product.update({ where: { id: data.id }, data });
  }
  async delete(id: number) {
    return await this._prismaClient.product.delete({ where: { id } });
  }
  async find(limit: number, offset: number): Promise<Product[]> {
    return this._prismaClient.product.findMany({ take: limit, skip: offset });
  }
  async findOne(id: number): Promise<Product> {
    const product = await this._prismaClient.product.findFirst({
      where: {
        id,
      },
    });

    if (product) return product;

    throw new NotFoundError("product not found");
  }
}
