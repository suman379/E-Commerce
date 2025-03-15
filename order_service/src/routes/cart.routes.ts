import express, { NextFunction, Request, Response } from "express";
import * as service from "../service/cart.service";
import * as repository from "../repository/cart.repository";
import { ValidateRequest } from "../utils/validator";
import { CartRequestInput, CartRequestSchema } from "../dto/cartrequest.dto";

const router = express.Router();
const repo = repository.CartRepository;

router.post("/cart", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const error = ValidateRequest(req.body, CartRequestSchema);
    if (error) {
      res.status(404).json({ error });
    } else {
      const response = await service.CreateCart(req.body as CartRequestInput, repo);
      res.status(200).json(response);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/cart", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await service.GetCart(req.body.customerId, repo);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.patch("/cart/:lineItemId", async (req: Request, res: Response, next: NextFunction) => {
  const lineItemId = +req.params.lineItemId;
  const response = await service.EditCart({ id: lineItemId, qty: req.body.qty }, repo);
  res.status(200).json(response);
});

router.delete("/cart/:lineItemId", async (req: Request, res: Response, next: NextFunction) => {
  const lineItemId = +req.params.lineItemId;
  const response = await service.DeleteCart(lineItemId, repo);
  res.status(200).json(response);
});

export default router;
