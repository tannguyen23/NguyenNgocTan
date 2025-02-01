import { body, param, query } from "express-validator";

export const validateCreateResource = [
	body("name").notEmpty().withMessage("Name is required"),
	body("description")
		.optional()
		.isString()
		.withMessage("Description must be a string"),
];

export const validateUpdateResource = [
	param("id").isInt({ gt: 0 }).withMessage("Invalid resource ID"),
	body("name").notEmpty().withMessage("Name is required"),
	body("description")
		.optional()
		.isString()
		.withMessage("Description must be a string"),
];

export const validateResourceId = [
	param("id").isInt({ gt: 0 }).withMessage("Invalid resource ID"),
];

export const validateGetResources = [
	query("search").optional().isString().withMessage("Search must be a string"),
	query("page")
		.optional()
		.isInt({ min: 1 })
		.withMessage("Page must be a positive integer"),
	query("limit")
		.optional()
		.isInt({ min: 1 })
		.withMessage("Limit must be a positive integer"),
	query("orderBy")
		.optional()
		.isIn(["name", "createdAt", "updatedAt"])
		.withMessage("OrderBy must be one of: name, createdAt, updatedAt"),
	query("orderDirection")
		.optional()
		.isIn(["asc", "desc"])
		.withMessage("OrderDirection must be either 'asc' or 'desc'"),
];
