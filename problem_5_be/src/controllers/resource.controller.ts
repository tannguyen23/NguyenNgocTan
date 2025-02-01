import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ResourceService } from "../services/resource.service";
import { NotFoundException, BadRequestException } from "../exceptions/CustomErrors";
import { Prisma } from "@prisma/client";
import { ResourceFilterParams } from "../types/resource.type";

export class ResourceController {
  private resourceService: ResourceService;

  constructor(resourceService: ResourceService) {
    this.resourceService = resourceService;
  }

  private handleValidationErrors(req: Request, res: Response): boolean {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return true;
    }
    return false;
  }

  createResource = async (req: Request, res: Response): Promise<void> => {
    if (this.handleValidationErrors(req, res)) return;

    try {
      const { name, description } = req.body;
      const resource = await this.resourceService.create(name, description);
      res.status(201).json(resource);
    } catch (error) {
      console.error("Create resource error:", error);
      res.status(500).json({ error: "Failed to create resource" });
    }
  };

  getResources = async (req: Request, res: Response) => {
    if (this.handleValidationErrors(req, res)) return;

    try {
      const params: ResourceFilterParams = {
        search: req.query.search as string,
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        orderBy: (req.query.orderBy as "name" | "createdAt" | "updatedAt") || "createdAt",
        orderDirection: (req.query.orderDirection as "asc" | "desc") || "desc",
      };

      const resources = await this.resourceService.getAll(params);
      const totalCount = await this.resourceService.getTotalCount(params.search);

      res.json({ data: resources, total: totalCount, page: params.page, limit: params.limit });
    } catch (error) {
      console.error("Get resources error:", error);
      res.status(500).json({ error: "Failed to retrieve resources" });
    }
  };

  getResourceById = async (req: Request, res: Response): Promise<void> => {
    if (this.handleValidationErrors(req, res)) return;

    try {
      const { id } = req.params;
      const resource = await this.resourceService.getById(Number(id));
      res.json(resource);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).json({ error: error.message });
      } else {
        console.error("Get resource by ID error:", error);
        res.status(500).json({ error: "Failed to retrieve resource" });
      }
    }
  };

  updateResource = async (req: Request, res: Response): Promise<void> => {
    if (this.handleValidationErrors(req, res)) return;

    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const resource = await this.resourceService.update(Number(id), name, description);
      res.json(resource);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof BadRequestException) {
        res.status(400).json({ error: error.message });
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error("Prisma error in updateResource:", error);
        res.status(500).json({ error: "Database error occurred" });
      } else {
        console.error("Unknown error in updateResource:", error);
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };

  deleteResource = async (req: Request, res: Response): Promise<void> => {
    if (this.handleValidationErrors(req, res)) return;

    try {
      const { id } = req.params;
      await this.resourceService.delete(Number(id));
      res.status(204).send();
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error("Prisma error in deleteResource:", error);
        res.status(500).json({ error: "Database error occurred" });
      } else {
        console.error("Unknown error in deleteResource:", error);
        res.status(500).json({ error: "Failed to delete resource" });
      }
    }
  };
}
