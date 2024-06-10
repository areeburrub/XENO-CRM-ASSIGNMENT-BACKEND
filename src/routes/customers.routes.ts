import { Router } from "express";
import {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customers.controller";


import {
  createCustomerValidation,
  updateCustomerValidation,
} from "../validators/customers.validators";

const router = Router();

router.get("/", getCustomers); //get all customer

router.post("/", createCustomerValidation, createCustomer);

router.get("/:id", getCustomer); //get a customer by id

router.put("/:id", updateCustomerValidation, updateCustomer);

router.delete("/:id", deleteCustomer);

export default router;
