import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";

import { applicationRouter } from "./routes";
import { appContext } from "./context";

const app = express();

app.use(cors({ origin: "http://localhost:4200" }));

app.use(
  "/trpc",
  createExpressMiddleware({
    router: applicationRouter,
    createContext: appContext,
  })
);

app.listen(3000);
