import { object, string } from "zod";

export const loginSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const userRegisterSchema = object({
  name: string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(32, "Name must be less than 32 characters"),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  phone: string(),
});

export const userChangePassSchema = object({
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  password2: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const userEditSchema = object({
  name: string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(32, "Name must be less than 32 characters"),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  phone: string()
    .min(1, "Name is required")
    .max(32, "Name must be less than 32 characters"),
  role: string({ required_error: "Name is required" }).min(
    1,
    "Name is required"
  ),
  status: string({ required_error: "Status is required" }).min(
    1,
    "Name is required"
  ),
});

export const clientRegisterSchema = object({
  name: string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(32, "Name must be less than 32 characters"),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  phone: string(),
  rut: string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(32, "Name must be less than 32 characters"),
});

export const clientEditSchema = object({
  name: string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(32, "Name must be less than 32 characters"),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  phone: string(),
  rut: string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(32, "Name must be less than 32 characters"),
  status: string({ required_error: "Status is required" }).min(
    1,
    "Name is required"
  ),
});

export const companyRegisterSchema = object({
  companyName: string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(32, "Name must be less than 32 characters"),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  phone: string(),
  client: string({ required_error: "Client is required" }).min(1, "Client is required"),
  rut: string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(32, "Name must be less than 32 characters"),
  location: string({ required_error: "Location is required" })
    .min(1, "Location is required")
    .max(32, "Location must be less than 32 characters"),
  observations: string(),
});

export const companyEditSchema = object({
  companyName: string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(32, "Name must be less than 32 characters"),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  phone: string(),
  rut: string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(32, "Name must be less than 32 characters"),
  client: string({ required_error: "Client is required" }).min(1, "Client is required"),
  location: string({ required_error: "Location is required" })
    .min(1, "Location is required")
    .max(32, "Location must be less than 32 characters"),
  observations: string(),
  status: string({ required_error: "Status is required" }).min(
    1,
    "Name is required"
  ),
});

export const projectRegisterSchema = object({
  companyId: string({ required_error: "Company is required" }).min(1, "Company is required"),
});








