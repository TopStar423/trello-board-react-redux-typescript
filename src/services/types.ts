export enum EHttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
  }

export interface IParams {
    [key: string]: any;
}

export interface IGenericOptions {
    url: string;
    params?: IParams;
}

export interface IErrorResponse {
    status: string;
    message: string;
}

export interface IBoardDataRes {
    id: string
    name: string
    description: string
}

export interface ICardDataRes {
    id: string
    name: string
    body: string
    groupDto: IBoardDataRes
}