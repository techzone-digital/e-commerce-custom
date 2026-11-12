import { createApp } from './app.js';
import { connectDB } from './config/database.js';
import { config } from './config/env.js';

const startServer = async () => {
  await connectDB();

  const app = createApp();

  app.listen(config.port, () => {
    console.log(`[Server] Running in ${config.env} mode on port ${config.port}`);
  });
};

startServer().catch((err) => {
  console.error('[Server] Fatal startup error:', err);
  process.exit(1);
});

