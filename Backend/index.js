
import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";

import pool from "./db.js";
import authRoutes from "./routes/auth.js";
import memberRoutes from "./routes/member.js";
import eventRoutes from "./routes/events.js";

const app = express();

const PORT = process.env.PORT || 3000;

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is missing from .env");
}

const PgSession = connectPgSimple(session);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    store: new PgSession({
      pool,
      tableName: "session",
      createTableIfMissing: true,
    }),

    name: "church.sid",
    secret: process.env.SESSION_SECRET,

    resave: false,
    saveUninitialized: false,

    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the church website backend");
});

app.get("/api/test", (req, res) => {
  res.send("React is connected to the backend");
});

app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT NOW() AS current_time, current_database() AS database_name"
    );

    res.json({
      message: "PostgreSQL connected successfully",
      database: result.rows[0].database_name,
      time: result.rows[0].current_time,
    });
  } catch (error) {
    console.error("Database connection error:", error.message);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(`The server is running at port ${PORT}`);
});
