import { adminMiddleware, t } from "./../trpc";
import { z } from "zod";

export const usersRouter = t.router({
  getUsers: t.procedure
    .use(adminMiddleware)
    .input(z.object({ adminId: z.string() }))
    .query((req) => {
      return req.ctx.users;
    }),
});
