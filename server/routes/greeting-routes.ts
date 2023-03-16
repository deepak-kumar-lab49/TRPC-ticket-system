import { t } from "./../trpc";
import { z } from "zod";

export const greetingsRouter = t.router({
  greet: t.procedure
    .input(z.string())
    /**
     * Query is for GET requests
     */
    .query((req) => {
      return `Hi ${req.input}`;
    }),
});
