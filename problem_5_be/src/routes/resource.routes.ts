import express from "express";
import { ResourceService } from "../services/resource.service";
import { ResourceController } from "../controllers/resource.controller";
import {
	validateCreateResource,
	validateUpdateResource,
	validateResourceId,
	validateGetResources,
} from "../middlewares/validateResource";

const router = express.Router();
const resourceService = new ResourceService();
const resourceController = new ResourceController(resourceService);

router.post("/", validateCreateResource, resourceController.createResource);
router.get("/", validateGetResources, resourceController.getResources);
router.get("/:id", validateResourceId, resourceController.getResourceById);
router.put("/:id", validateUpdateResource, resourceController.updateResource);
router.delete("/:id", validateResourceId, resourceController.deleteResource);

export default router;
