import express from "express";
import cors from "cors";
import orderRoutes from "./routes/order.routes";
import cartRoutes from "./routes/cart.routes";
import { HandleErrorWithLogger, httpLogger } from "./utils";

const app = express();
app.use(express.json());
app.use(cors());
app.use(httpLogger);

app.use(orderRoutes);
app.use(cartRoutes);

//@ts-ignore
app.use(HandleErrorWithLogger);

app.use("/", (__, res, _) => {
  res.status(200).send({ message: "I am healthy!" });
});

export default app;
