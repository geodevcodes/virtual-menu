import * as yup from "yup";

export const createMenuSchema = yup.object().shape({
  menuName: yup
    .string()
    .required("Menu name is required")
    .min(3, "Menu name must be at least 3 characters"),
  restaurantReviewLinkUrl: yup
    .string()
    .nullable()
    .notRequired()
    .when([], {
      is: (value: any) => value?.length > 0,
      then: (schema) =>
        schema.matches(
          /^https:\/\/(app|staging)\.theincite360\.com/,
          "Review link must be from https://app.theincite360.com or https://staging.theincite360.com"
        ),
      otherwise: (schema) => schema.notRequired(),
    }),
  accommodationReviewLinkUrl: yup
    .string()
    .nullable()
    .notRequired()
    .when([], {
      is: (value: any) => value?.length > 0,
      then: (schema) =>
        schema.matches(
          /^https:\/\/(app|staging)\.theincite360\.com/,
          "Review link must be from https://app.theincite360.com or https://staging.theincite360.com"
        ),
      otherwise: (schema) => schema.notRequired(),
    }),
  spaReviewLinkUrl: yup
    .string()
    .nullable()
    .notRequired()
    .when([], {
      is: (value: any) => value?.length > 0,
      then: (schema) =>
        schema.matches(
          /^https:\/\/(app|staging)\.theincite360\.com/,
          "Review link must be from https://app.theincite360.com or https://staging.theincite360.com"
        ),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export const editMenuSchema = yup.object().shape({
  menuName: yup
    .string()
    .required("Menu name is required")
    .min(3, "Menu name must be at least 3 characters"),
  restaurantReviewLinkUrl: yup
    .string()
    .nullable()
    .notRequired()
    .when([], {
      is: (value: any) => value?.length > 0,
      then: (schema) =>
        schema.matches(
          /^https:\/\/(app|staging)\.theincite360\.com/,
          "Review link must be from https://app.theincite360.com or https://staging.theincite360.com"
        ),
      otherwise: (schema) => schema.notRequired(),
    }),
  accommodationReviewLinkUrl: yup
    .string()
    .nullable()
    .notRequired()
    .when([], {
      is: (value: any) => value?.length > 0,
      then: (schema) =>
        schema.matches(
          /^https:\/\/(app|staging)\.theincite360\.com/,
          "Review link must be from https://app.theincite360.com or https://staging.theincite360.com"
        ),
      otherwise: (schema) => schema.notRequired(),
    }),
  spaReviewLinkUrl: yup
    .string()
    .nullable()
    .notRequired()
    .when([], {
      is: (value: any) => value?.length > 0,
      then: (schema) =>
        schema.matches(
          /^https:\/\/(app|staging)\.theincite360\.com/,
          "Review link must be from https://app.theincite360.com or https://staging.theincite360.com"
        ),
      otherwise: (schema) => schema.notRequired(),
    }),
});
