import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    NEXT_PUBLIC_API_DOMAIN: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_API_DOMAIN: z.string().url(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_API_DOMAIN: process.env.NEXT_PUBLIC_API_DOMAIN,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
