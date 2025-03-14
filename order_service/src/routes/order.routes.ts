import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.post("/order", async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "created order" });
});

router.get("/order", async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "get order" });
});

router.get("/order/:id", async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "get order" });
});

router.delete("/order/:id", async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "delete order" });
});

export default router;
