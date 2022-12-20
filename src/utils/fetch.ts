import type {IMethod, IOptions} from "../types/IFetch";

import {objToQuery} from '../utils/query_to_obj'
import {BASE_URL} from "../constant/Index";

import type IResult from "../types/IResult";

export const fetchData = (url: string, data: any, method: keyof IMethod): Promise<IResult<any>> => {
    url = BASE_URL + url
    let options: IOptions = {
        method: method,
    }
    method === "GET" && data && (data = "?" + objToQuery(data)) && (url += data)
    if (method === "POST" || method === "PUT") {
        let headers = {
            'Content-Type': 'application/json'
        }
        let body = JSON.stringify(data)
        options = {...options, headers, body}
    }
    return new Promise((resolve, reject) => {
        fetch(url, options).then((response) => {
            return response.json()
        }).then((response) => {
            resolve(response)
        }).catch((error) => {
                reject(error)
            }
        )
    })
}
