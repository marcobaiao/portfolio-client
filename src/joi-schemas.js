import Joi from "joi";

export const postSchema = Joi.object({
  title: Joi.string()
    .required()
    .messages({ "string.empty": "Title is required." }),
  description: Joi.string().required().min(100).messages({
    "string.empty": "Description is required.",
    "string.min": "Description must have at least 100 characters.",
  }),
  thumbnailImg: Joi.alternatives()
    .try(
      Joi.object().required().messages({
        "any.required": "Thumbnail image is required.",
        "object.base": "Thumbnail image is required.",
      }),
      Joi.string().required().messages({
        "string.empty": "Thumbnail image is required.",
      })
    )
    .messages({ "alternatives.types": "Thumbnail image is required." }),
  /*thumbnailImg: Joi.object().required().messages({
    "any.required": "Thumbnail image is required.",
    "object.base": "Thumbnail image is required.",
  }),*/
  categories: Joi.array().required().min(1).messages({
    "string.empty": "At least one category is required",
    "array.min": "At least one category is required.",
  }),
  content: Joi.string().required().min(100).messages({
    "string.empty": "Content is required.",
    "string.min": "Content must have at least 100 characters.",
  }),
});

export const projectSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "string.empty": "Name is required." }),
  resume: Joi.string().required().min(125).messages({
    "string.empty": "Description is required.",
    "string.min": "Description must have at least 125 characters.",
  }),
  thumbnailImg: Joi.alternatives()
    .try(
      Joi.object().required().messages({
        "any.required": "Thumbnail image is required.",
        "object.base": "Thumbnail image is required.",
      }),
      Joi.string().required().messages({
        "string.empty": "Thumbnail image is required.",
      })
    )
    .messages({
      "alternatives.types": "Thumbnail image is required.",
      "any.required": "Thumbnail image is required.",
    }),
  images: Joi.array()
    .required()
    .min(1)
    .messages({ "array.min": "At least one image is required" }),
  technologies: Joi.array().required().min(1).messages({
    "any.required": "At least one technology is required.",
    "array.base": "At least one technology is required",
  }),
  description: Joi.string().required().min(100).messages({
    "string.empty": "Content is required.",
    "string.min": "Content must have at least 100 characters.",
  }),
});

export const postCategorySchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "string.empty": "Name is required" }),
});

export const projectCategorySchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "string.empty": "Name is required" }),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
});
