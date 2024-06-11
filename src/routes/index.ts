import { Router } from "express";

import authRotes from "./auth.routes";
import customersRoutes from "./customers.routes";
import notificationsRoutes from "./notifications.routes";
import ordersRoutes from "./orders.routes";

import { isAuthenticated } from "../utils/isAuthenticated";

const router = Router();

router.use("/auth", authRotes);
router.use("/customers", isAuthenticated, customersRoutes);
router.use("/notifications", isAuthenticated,  notificationsRoutes);
router.use("/orders",isAuthenticated, ordersRoutes)

export default router;
