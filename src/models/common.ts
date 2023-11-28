export interface ISortModel{
    by: string
    desc?: boolean
}


export interface IBaseQueryModel{
    page?: number
    size?: number
    filter?: any
    sort?: ISortModel
}

