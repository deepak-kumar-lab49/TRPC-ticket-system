import { initTRPC } from "@trpc/server";
import { z } from "zod";

export const t = initTRPC.create();

export const appRouter = t.router({
  ticket: t.procedure
    .input(z.object({ title: z.string(), description: z.string() }))
    .query((req) => {
      return {
        id: `T-${Date.now()}`,
        created: true,
        createdAt: new Date(),
        title: req.input.title,
      };
    }),
});

export type AppRouter = typeof appRouter;
