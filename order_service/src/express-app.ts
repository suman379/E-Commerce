import express from "express";
import cors from "cors";
import orderRoutes from "./routes/order.routes";
import cartRoutes from "./routes/cart.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use(orderRoutes);
app.use(cartRoutes);

app.use("/", (__, res, _) => {
  res.status(200).send({ message: "I am healthy!" });
});

export default app;
