import { z } from "zod";
import { t } from "./../trpc";
import { greetingsRouter } from "./greeting-routes";
import { usersRouter } from "./users-routes";

const appRouter = t.router({
  ticket: t.procedure
    /**
     * The zod library is used here for input validations.
     * The output explicitly defines the response type, which restricts to pass down the extra properties on the response (maybe incase passed accidentally)
     */
    .input(z.object({ title: z.string(), description: z.string() }))
    .output(
      z.object({
        id: z.string(),
        created: z.boolean(),
        createdAt: z.date(),
        title: z.string(),
      })
    )
    /**
     * Mutation is for POST requests
     */
    .mutation((req) => {
      console.log(req.ctx.isAdmin);
      return {
        id: `T-${Date.now()}`,
        created: true,
        createdAt: new Date(),
        title: req.input.title,
        description: req.input.description,
      };
    }),
  greetings: greetingsRouter,
  admin: usersRouter,
});

export const applicationRouter = appRouter;

/**
 * Merge routers in case of nested routers
 */
// export const applicationRouter = t.mergeRouters(appRouter, greetingsRouter);

export type AppRouter = typeof applicationRouter;
