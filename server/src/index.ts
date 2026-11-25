import { env } from "./config/env.js";
import { connectDb } from "./db/connect.js";
import { createApp } from "./app.js";

async function startServer(): Promise<void> {
  await connectDb();
  const app = createApp();

  app.listen(env.port, () => {
    console.log(`TeddyPups API listening on http://localhost:${env.port}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

