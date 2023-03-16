import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import { appContext } from "./context";

export const t = initTRPC
  .context<inferAsyncReturnType<typeof appContext>>()
  .create();

export const adminMiddleware = t.middleware((params) => {
  if (!params.ctx.isAdmin) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const userData = {
    users: [
      { userId: "1234", name: "John" },
      { userId: "5678", name: "Michael" },
    ],
  };
  return params.next({ ctx: userData });
});
