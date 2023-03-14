import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";

import { appRouter } from "./router";

const app = express();
app.use(cors({ origin: "http://localhost:4200" }));

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: ({ req, res }) => {
      return {};
    },
  })
);

app.listen(3000);
