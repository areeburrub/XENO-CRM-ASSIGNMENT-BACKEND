import { body } from "express-validator";

export const createCustomerValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("createdBy").notEmpty().withMessage("createdBy is required"),
];

export const updateCustomerValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
];
