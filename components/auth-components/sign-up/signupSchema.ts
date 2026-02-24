import * as yup from "yup";

// SignUp Validation Schema
export const signupSchema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email(" Invalid Email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must not exceed 15 characters"),
});
