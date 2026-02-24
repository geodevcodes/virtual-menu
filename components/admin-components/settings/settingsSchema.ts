import * as yup from "yup";

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Current password is required")
    .min(8, "Password must be at least 8 characters"),

  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters"),

  confirmNewPassword: yup
    .string()
    .required("Please confirm your new password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

// export const updateProfileSchema = yup.object().shape({
//   businessName: yup.string().required("Business name is required"),

//   address: yup.string().when("hasPhysicalAddress", {
//     is: true,
//     then: yup.string().required("Address is required when physical address is checked"),
//     otherwise: yup.string().notRequired(),
//   }),

//   shortDescription: yup
//     .string()
//     .max(500, "Short description cannot exceed 500 characters"),
// });
