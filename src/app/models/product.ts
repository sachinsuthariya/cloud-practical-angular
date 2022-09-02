import { Pagination } from "./common";

export interface Product {
    productId: string,
    name: string,
    SKU: string,
    price: string,
    quantity: number,
    cartId: string,
    createdAt?: string,
    updatedAt?: string,
}

export interface ProductListResponse {
        status: string,
        code: number,
        data: {
            pagination: Pagination,
            list: Product[],
        },
        message: string,
}

export interface ProductResponse {
    status: string,
    code: number,
    data?: Product,
    message: string,
}




