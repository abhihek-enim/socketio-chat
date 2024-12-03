import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({ path: "./.env" });

connectDB().then(() => {
  app.on("error", (error) => {
    throw error;
  });
  app.listen(process.env.PORT || 8080, () => {
    console.log(`App is listening at port ${process.env.PORT}`);
  });
});
