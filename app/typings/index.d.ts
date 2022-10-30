export declare type ResponseBase<T = any> = {
    data: T;
    msg: string;
    success: boolean;
    err: any;
};
export declare type Page = {
    currentPage: number;
    pageSize: number;
};
