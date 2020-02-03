export interface ResponseSuccessModel {
    title: string;
    subtitle: string;
}

export interface ResponseErrorModel {
    message?: string;
}

export type ResponseModel = ResponseSuccessModel | ResponseErrorModel;