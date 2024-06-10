import { Router } from "express";

import authRotes from "./auth.routes";
import customersRouter from "./customers.routes";

const router = Router();

router.use("/auth", authRotes);
router.use("/customers", customersRouter);

export default router;
