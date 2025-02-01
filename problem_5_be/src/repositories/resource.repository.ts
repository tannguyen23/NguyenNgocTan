import prisma from "../config/prismaClient";
import { ResourceFilterParams } from "../types/resource.type";

export class ResourceRepository {
  async create(name: string, description?: string) {
    return prisma.resource.create({
      data: { name, description: description ?? null },
    });
  }

  async getAll(params: ResourceFilterParams) {
    const {
        search,
        page = 1,
        limit = 10,
        orderBy = "createdAt",
        orderDirection = "desc",
    } = params;

    let where = {};

    if (search) {
        const searchLower = search.toLowerCase(); // ✅ Convert search về chữ thường
        where = {
            OR: [
                { name: { contains: searchLower } },
                { description: { contains: searchLower } },
            ],
        };
    }

    return prisma.resource.findMany({
        where,
        orderBy: { [orderBy]: orderDirection },
        skip: (page - 1) * limit,
        take: limit,
    });
}


  async getTotalCount(search?: string) {
    let where: any = {};

    if (search) {
        const searchLower = search.toLowerCase(); // ✅ Convert về chữ thường
        where = {
            OR: [
                { name: { contains: searchLower } },
                { description: { contains: searchLower } },
            ],
        };
    }

    return prisma.resource.count({ where });
}


  async getById(id: number) {
    return prisma.resource.findUnique({ where: { id } });
  }

  async update(id: number, name: string, description?: string) {
    return prisma.resource.update({
      where: { id },
      data: {
        name,
        description: description ?? null,
        updatedAt: new Date(),
      },
    });
  }

  async delete(id: number) {
    await prisma.resource.delete({ where: { id } });
  }
}
