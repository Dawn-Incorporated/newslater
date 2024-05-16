import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  out: './src/server/db',
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["*"],
} satisfies Config;