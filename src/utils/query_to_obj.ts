export const queryToObj = (queryStr:string) : any=> {
    let queryObj = {}
    const queryList = queryStr.split("&")
    queryList.forEach(query => {
        const splitQuery = query.split("=")
        queryObj = {...queryObj, [splitQuery[0]]: splitQuery[1]}
    })
    return queryObj
}

export const objToQuery = (obj :any) :string=> {
    let queryStr=""
    for (const key in obj) {
        queryStr += key + "=" + obj[key] + "&"
    }
    queryStr = queryStr.slice(0, -1)
    return queryStr
}

