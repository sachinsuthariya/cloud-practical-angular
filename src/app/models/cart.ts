export interface Cart {
    cartId: string,
    userId: string,
    productId: string,
    name: string,
    SKU: string,
    price: string,
    quantity: number,
}


export interface CartListResponse {
    status: string,
    code: number,
    data: {
        items: Cart[],
        count: number,
    },
    message: string,
}

export interface CartResponse {
    status: string,
    code: number,
    data?: { count: number },
    message: string,
}
