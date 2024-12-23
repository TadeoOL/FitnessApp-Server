import app from "./app";
import config from "./config/environment";
import { connectDB } from "./config/database";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(config.port, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
