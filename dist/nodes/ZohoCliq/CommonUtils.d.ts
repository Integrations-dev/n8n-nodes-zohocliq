import type { IExecuteFunctions, IHookFunctions, IDataObject, ILoadOptionsFunctions, IHttpRequestMethods } from 'n8n-workflow';
export declare function throwOnErrorStatus(this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions, responseData: {
    error?: Array<{
        description: string;
        message: string;
    }>;
}): void;
export declare function CliqApiRequest(this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions, method: IHttpRequestMethods, endpoint: string, body?: IDataObject, qs?: IDataObject): Promise<any>;
export declare function getDomain(domain: string): string | undefined;
export declare function getTeamsList(this: ILoadOptionsFunctions): Promise<any>;
export declare function getTeamsListWithoutCustom(this: ILoadOptionsFunctions): Promise<any>;
export declare function getChannelsList(this: ILoadOptionsFunctions): Promise<any>;
export declare function getChannelsWithUniqueNameList(this: ILoadOptionsFunctions): Promise<any>;
export declare function getUsersList(this: ILoadOptionsFunctions): Promise<any>;
export declare function getChatsList(this: ILoadOptionsFunctions): Promise<any>;
export declare function getUserStatusesList(this: ILoadOptionsFunctions): Promise<any>;
