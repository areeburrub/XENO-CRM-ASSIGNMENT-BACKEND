import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";

import cors from "cors";
import passport from "passport";
import cookieSession from "cookie-session";

import "./config/passport";
import authRoutes from "./routes/auth";

dotenv.config();

export const app: Express = express();

app.use(morgan("common"));

app.use(
  cookieSession({
    name: "session",
    keys: ["supersecretkeyforXENOassignment"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

app.use("/auth", authRoutes);
