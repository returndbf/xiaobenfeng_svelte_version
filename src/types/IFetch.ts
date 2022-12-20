export interface IMethod {
    GET,
    POST,
    PUT,
    DELETE
}

export interface IOptions {
    method: keyof IMethod,
    headers?: {
        'Content-Type': string,
    },
    body?: any,

}
