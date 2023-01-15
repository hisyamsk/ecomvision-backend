import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import generalRouter from "./routes/general.router.js";
import clientRouter from "./routes/client.router.js";
import managementRouter from "./routes/management.router.js";
import salesRouter from "./routes/sales.router.js";

// CONFIG
dotenv.config();

// EXPRESS
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

// ROUTES
app.use("/general", generalRouter);
app.use("/client", clientRouter);
app.use("/management", managementRouter);
app.use("/sales", salesRouter);

// MONGOOSE SETUP
const PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });
