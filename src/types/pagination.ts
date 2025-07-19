export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
}

export interface CategoryPaginationMeta {
  totalData: number;
  currentPage: number;
  totalPages: number;
}

export interface PageableResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface CategoryPageableResponse<T> {
  data: T[];
  totalData: number;
  currentPage: number;
  totalPages: number;
}

export interface PaginationQueries {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  articleId?: string;
  userId?: string;
  title?: string;
  category?: string;
  createdAtStart?: string;
  createdAtEnd?: string;
}
