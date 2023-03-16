import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";

import { applicationRouter } from "./routes";
import { appContext } from "./context";

const app = express();

app.use(cors({ origin: "http://localhost:4200" }));

/**
 * TRPC
 *
 * 1. TRPC allows to easily build and consume fully typesafe APIs without schemas or code generation.
 * 2. TRPC allows to call server functions from the client either for single or batch requests.
 * 3. TRPC works with monorepos and supports many different frameworks on backend and frontend side via TRPC adapters.
 * 4. Commonly used with T3 techstack - https://create.t3.gg/
 * 5. TRPC also provides the web socket functionality out of the box.
 *
 */

app.use(
  "/trpc",
  createExpressMiddleware({
    router: applicationRouter,
    createContext: appContext,
  })
);

app.listen(3000);
