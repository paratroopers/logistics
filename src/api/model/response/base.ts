export  interface BaseModelResponse<T>{
    Data?: T;
    TotalCount?: number;
    Message?: string;
    Status?: number;
}
export  interface BaseModelListResonse<T>{
    Data?: T[];
    TotalCount?: number;
    Message?: string;
    Status?: number;
}
