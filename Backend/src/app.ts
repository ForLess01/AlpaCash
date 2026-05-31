import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./modules/auth/auth.routes";
import profilesRoutes from "./modules/profiles/profiles.routes";
import marketplaceRoutes from "./modules/marketplace/marketplace.routes";
import lotesRoutes from "./modules/lotes-fibra/lotes.routes";
import solicitudesRoutes from "./modules/solicitudes-compra/solicitudes.routes";
import preciosRoutes from "./modules/precios/precios.routes";
import adminRoutes from "./modules/admin/admin.routes";

const app = express();

if (process.env.NODE_ENV === "production" && !process.env.FRONTEND_URL) {
  throw new Error("FRONTEND_URL must be set in production");
}

const allowedOrigin = process.env.FRONTEND_URL ?? "http://localhost:3000";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (_req, res) => {
  res.json({ message: "API AlpaTrace funcionando" });
});

app.use("/api/auth", authRoutes);
app.use("/api/profiles", profilesRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/lotes", lotesRoutes);
app.use("/api/solicitudes", solicitudesRoutes);
app.use("/api/precios", preciosRoutes);
app.use("/api/admin", adminRoutes);

export default app;