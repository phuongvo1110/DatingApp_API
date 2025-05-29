export interface Pagination {
    currentItem: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}
export class PaginatedResult<T> {
    items?: T;
    pagination?: Pagination;
}