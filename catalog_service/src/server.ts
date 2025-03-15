import expressApp from "./expressApp";
import { logger } from "./utils";

const PORT = process.env.PORT || 9001;
export const StartServer = async () => {
  expressApp.listen(PORT, () => {
    logger.info("Listening to ", PORT);
  });

  process.on("uncaughtException", async (error) => {
    logger.error(error);
    process.exit(1);
  });
};

StartServer().then(() => {
  logger.info("Server is up");
});
