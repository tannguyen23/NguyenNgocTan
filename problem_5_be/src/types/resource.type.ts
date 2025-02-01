export interface ResourceDTO {
  name: string;
  description?: string;
}

export interface ResourceFilterParams {
  search?: string;
  page?: number;
  limit?: number;
  orderBy?: "name" | "createdAt" | "updatedAt";
  orderDirection?: "asc" | "desc";
}
