import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDB from "./db/index.js";
import { app } from "./app.js";
connectDB().then(() => {
  app.on("error", (error) => {
    throw error;
  });
  app.listen(process.env.PORT || 8080, () => {
    console.log(`App is listening at port ${process.env.PORT}`);
  });
});
