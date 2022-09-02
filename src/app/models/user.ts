export interface User {
    id: string,
    email: string,
    token?: string,
}

export interface LoginResponse {
    status: string,
    code: number,
    data: User,
    message: string,
}
