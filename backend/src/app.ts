import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import foodRoute from "./routes/food.route"



// Create Express app with proper typing
const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS
app.use(
  cors({
    origin: "*", // 🔒 In production, replace "*" with your frontend URL
    credentials: true, // allow cookies/auth headers across domains
  })
);

app.use(cookieParser());

// Routes
import authRoutes from "./routes/auths.routes";

app.use("/api/auth", authRoutes);
app.use("/api/food",foodRoute);

// Health check route (optional but useful)
app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Server is healthy 🚀" });
});

// Global error handler (for safety)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("🔥 Global error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
