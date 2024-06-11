import { Router } from "express";
import {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer, getCustomerCount,
} from "../controllers/customers.controller";

import handleValidationError from "../middlewares/handleValidationError";

import {
  createCustomerValidation,
  updateCustomerValidation,
} from "../validators/customers.validators";

const router = Router();

router.get("/count", getCustomerCount);

router.get("/", getCustomers);

router.post("/", createCustomerValidation, handleValidationError, createCustomer);

router.get("/:id", getCustomer);

router.put("/:id", updateCustomerValidation, handleValidationError, updateCustomer);

router.delete("/", deleteCustomer);

export default router;
