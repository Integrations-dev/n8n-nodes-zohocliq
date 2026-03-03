import { INodeType, INodeTypeDescription, ILoadOptionsFunctions, IDataObject, IExecuteFunctions } from 'n8n-workflow';
export declare class ZohoCliq implements INodeType {
    description: INodeTypeDescription;
    methods: {
        loadOptions: {
            getTeams(this: ILoadOptionsFunctions): Promise<any>;
            getTeamsWithoutCustom(this: ILoadOptionsFunctions): Promise<any>;
            getChannels(this: ILoadOptionsFunctions): Promise<any>;
            getChannelsWithUniqueName(this: ILoadOptionsFunctions): Promise<any>;
            getUsers(this: ILoadOptionsFunctions): Promise<any>;
            getChats(this: ILoadOptionsFunctions): Promise<any>;
            getUserStatuses(this: ILoadOptionsFunctions): Promise<any>;
        };
    };
    execute(this: IExecuteFunctions): Promise<{
        json: IDataObject;
        pairedItem: {
            item: number;
        };
    }[][]>;
}
