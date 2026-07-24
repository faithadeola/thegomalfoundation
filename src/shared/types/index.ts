export type Maybe<T> = T | null | undefined;

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: string;
  code?: number;
}

export type ApiResult<T> = ApiResponse<T> | ApiError;
