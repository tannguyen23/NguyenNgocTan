import { ResourceRepository } from "../repositories/resource.repository";
import { NotFoundException, BadRequestException } from "../exceptions/CustomErrors";
import { ResourceFilterParams } from "../types/resource.type";

export class ResourceService {
  private resourceRepo = new ResourceRepository();

  async create(name: string, description?: string) {
    if (!name) {
      throw new BadRequestException("Name is required");
    }
    return this.resourceRepo.create(name, description);
  }

  async getAll(params: ResourceFilterParams) {
    return this.resourceRepo.getAll(params);
  }

  async getTotalCount(search?: string) {
    return this.resourceRepo.getTotalCount(search);
  }

  async getById(id: number) {
    if (isNaN(id) || id <= 0) {
      throw new BadRequestException("Invalid resource ID");
    }
    const resource = await this.resourceRepo.getById(id);
    if (!resource) {
      throw new NotFoundException("Resource not found");
    }
    return resource;
  }

  async update(id: number, name: string, description?: string) {
    if (isNaN(id) || id <= 0) {
      throw new BadRequestException("Invalid resource ID");
    }
    if (!name) {
      throw new BadRequestException("Name is required");
    }
    const existingResource = await this.resourceRepo.getById(id);
    if (!existingResource) {
      throw new NotFoundException("Resource not found");
    }
    return this.resourceRepo.update(id, name, description);
  }

  async delete(id: number) {
    if (isNaN(id) || id <= 0) {
      throw new BadRequestException("Invalid resource ID");
    }
    const existingResource = await this.resourceRepo.getById(id);
    if (!existingResource) {
      throw new NotFoundException("Resource not found");
    }
    return this.resourceRepo.delete(id);
  }
}