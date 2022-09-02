export interface Pagination {
    pages: number,
    total: number,
    max: number | {
        limit: number,
        page: number,
        staticCount: number,
    },
}
