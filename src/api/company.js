import service from '@/utils/request'

//
export function GetCompanys(data){
    return service.request({
        method: "post",
        url: "/company/list",
        data: data,
    })
}


export function CreateCompany(data){
    return service.request({
        method: "post",
        url: "/company/create",
        data: data,
    })
}

export function DeleteCompany(data){
    return service.request({
        method: "post",
        url: "/company/delete",
        data: data,
    })
}


export function SearchCompanys(data){
    return service.request({
        method: "post",
        url: "/company/search",
        data: data,
    })
}

export function UpdateCompanys(data){
    return service.request({
        method: "post",
        url: "/company/update",
        data: data,
    })
}