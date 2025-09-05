import dotenv from "dotenv";
import app from "./src/app";
import connectToDB from "./src/db/db";

// Load environment variables from .env file
dotenv.config();

// Explicitly type the PORT as a number with fallback
const PORT: number = parseInt(process.env.PORT || "5000", 10);

// Connect to MongoDB
(async () => {
  try {
    await connectToDB();
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to the database", error);
    process.exit(1); // Exit if DB connection fails
  }
})();
