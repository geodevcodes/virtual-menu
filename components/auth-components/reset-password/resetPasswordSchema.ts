import * as yup from "yup";

// Reset Password Validation Schema
export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must not exceed 15 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null as any], "Passwords must match")
    .required("Confirm Password is required"),
});
