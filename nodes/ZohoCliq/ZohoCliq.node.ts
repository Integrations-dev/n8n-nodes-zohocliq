import { INodeType, INodeTypeDescription, NodeConnectionTypes , ILoadOptionsFunctions, IDataObject, IExecuteFunctions, NodeApiError, NodeOperationError } from 'n8n-workflow';

import {
    buildMessageBody,
    CliqApiRequest,
    getTeamsList,
    getTeamsListWithoutCustom,
    getChannelsWithUniqueNameList,
    getChannelsList,
    getChatsList,
    getUserStatusesList,
    getUsersList
} from './CommonUtils';

import { messageFields, messageOperations } from './resources/MessageResource';
import { userFields, userOperations } from './resources/UsersResource';
import { channelFields, channelOperations } from './resources/ChannelResource';
import { teamFields, teamOperations } from './resources/TeamResource';
import { threadFields, threadOperations } from './resources/ThreadResource';


export class ZohoCliq implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Zoho Cliq',
        name: 'zohoCliq',
        icon: { light: 'file:cliq.svg', dark: 'file:cliq.dark.svg' },
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Consume Zoho Cliq API',
        defaults: {
            name: 'Zoho Cliq',
        },
        inputs: [ NodeConnectionTypes.Main ],
        outputs: [ NodeConnectionTypes.Main ],
        credentials: [
            {
                name: 'zohoCliqOAuth2Api',
                required: true,
            },
        ],

        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Channel',
                        value: 'Channel',
                    },
                    {
                        name: 'Message',
                        value: 'Message',
                    },
                    {
                        name: 'Team',
                        value: 'Team'
                    },
                    {
                        name: 'Thread',
                        value: 'Thread',
                    },
                    {
                        name: 'User',
                        value: 'Users',
                    }
                ],
                default: 'Message',
            },

            ...channelOperations,
            ...channelFields,

            ...messageOperations,
            ...messageFields,

            ...teamOperations,
            ...teamFields,

            ...threadOperations,
            ...threadFields,

            ...userOperations,
            ...userFields
        ],
        usableAsTool: true
    };

    methods = {
        loadOptions: {
            async getTeams(this: ILoadOptionsFunctions) {
                return getTeamsList.call(this);
            },

            async getTeamsWithoutCustom(this: ILoadOptionsFunctions) {
                return getTeamsListWithoutCustom.call(this);
            },

            async getChannels(this: ILoadOptionsFunctions) {
                return getChannelsList.call(this);
            },

            async getChannelsWithUniqueName(this: ILoadOptionsFunctions) {
                return getChannelsWithUniqueNameList.call(this);
            },

            async getUsers(this: ILoadOptionsFunctions) {
                return getUsersList.call(this);
            },

            async getChats(this: ILoadOptionsFunctions) {
                return getChatsList.call(this);
            },

            async getUserStatuses(this: ILoadOptionsFunctions) {
                return getUserStatusesList.call(this);
            }
        },
    };

    async execute(this: IExecuteFunctions) {
        const items = this.getInputData();

        const returnData: Array<{ json: IDataObject; pairedItem: { item: number } }> = [];


        for (let i = 0; i < items.length; i++) {
            try {
                const resource = this.getNodeParameter('resource', i) as string;
                const operation = this.getNodeParameter('operation', i) as string;

                if (resource === 'Message' && (operation === 'Channel' || operation === 'ChannelAsBot')) {
                    const channel = this.getNodeParameter('channel', i, '') as string;
                    const customChannelId = this.getNodeParameter('customChannelId', i, '') as string;
                    const text = this.getNodeParameter('text', i) as string;
                    const botUniqueName = this.getNodeParameter('botUniqueName', i, '') as string;
                    const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

                    const queryString: IDataObject = {};
                    const body = buildMessageBody(text, additionalFields);

                    const channel_id = customChannelId || channel;

                    if (!channel_id) {
                        throw new NodeOperationError(this.getNode(), 'You must select a channel or provide a channel ID.');
                    }

                    if (botUniqueName) queryString.bot_unique_name = botUniqueName;


                    const responseData = await CliqApiRequest.call(this, 'POST', `api/v2/channels/${channel_id}/message`, body, queryString);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                } else if (resource === 'Message' && operation === 'Chat') {
                    const chat = this.getNodeParameter('chat', i, '') as string;
                    const customChatId = this.getNodeParameter('customChatId', i, '') as string;
                    const text = this.getNodeParameter('text', i) as string;
                    const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

                    const body = buildMessageBody(text, additionalFields);

                    const chat_id = customChatId || chat;

                    if (!chat_id) {
                        throw new NodeOperationError(this.getNode(), 'You must select a chat or provide a chat ID.');
                    }

                    const responseData = await CliqApiRequest.call(this, 'POST', `api/v2/chats/${chat_id}/message`, body);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                } else if (resource === 'Message' && operation === 'DM') {
                    const user = this.getNodeParameter('user', i, '') as string;
                    const customEmailID = this.getNodeParameter('customUserId', i, '') as string;
                    const text = this.getNodeParameter('text', i) as string;
                    const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

                    const body = buildMessageBody(text, additionalFields);

                    const email_Id = customEmailID || user;
                    if (!email_Id) {
                        throw new NodeOperationError(this.getNode(), 'You must select a user or provide a email ID.');
                    }


                    const responseData = await CliqApiRequest.call(this, 'POST', `api/v2/buddies/${email_Id}/message`, body);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                } else if (resource === 'Users' && operation === 'retrieveUser') {
                    const ID = this.getNodeParameter('emailIDorZUID', i, '') as string;

                    if (!ID) {
                        throw new NodeOperationError(this.getNode(), 'You must provide an email ID/ ZUID.');
                    }

                    const queryString: IDataObject = {
                        fields: 'all',
                    }

                    const responseData = await CliqApiRequest.call(this, 'GET', `api/v2/users/${ID}`, {}, queryString);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                } else if (resource === 'Thread' && operation === 'Thread') {
                    const channel = this.getNodeParameter('channel', i, '') as string;
                    const customChannelId = this.getNodeParameter('customChannelId', i, '') as string;
                    const messageId = this.getNodeParameter('messageId', i) as string;
                    const text = this.getNodeParameter('text', i) as string;
                    const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

                    const channel_id = customChannelId || channel;
                    if (!channel_id) {
                        throw new NodeOperationError(this.getNode(), 'You must select a channel or provide a channel ID.');
                    }

                    const body = buildMessageBody(text, additionalFields);
                    body.thread_title = additionalFields.threadTitle ?? '';
                    body.thread_message_id = messageId;
                    body.post_in_parent = additionalFields.postInChannel ?? false;

                    const responseData = await CliqApiRequest.call(this, 'POST', `api/v2/channels/${channel_id}/message`, body);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                } else if (resource === 'Users' && operation === 'addUserStatus') {
                    const statusCode = this.getNodeParameter('statusCode', i, '') as string;
                    const statusMessage = this.getNodeParameter('statusMessage', i, '') as string;

                    const body: IDataObject = {
                        code: statusCode,
                        message: statusMessage,
                    };

                    const responseData = await CliqApiRequest.call(this, 'POST', `api/v2/statuses`, body);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                } else if (resource === 'Users' && operation === 'setUserStatus') {
                    const status = this.getNodeParameter('status', i, '') as string;

                    if (!status) {
                        throw new NodeOperationError(this.getNode(), 'You must provide a status.');
                    }

                    const responseData = await CliqApiRequest.call(this, 'PUT', `api/v2/statuses/${status}/set`, {});
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                } else if (resource === 'Channel' && operation === 'addUsersToChannel') {
                    const channel = this.getNodeParameter('channel', i, '') as string;
                    const customChannelId = this.getNodeParameter('customChannelId', i, '') as string;
                    const userEmails = this.getNodeParameter('userEmails', i, '') as string;
                    const channel_id = customChannelId || channel;


                    if (!channel_id) {
                        throw new NodeOperationError(this.getNode(), 'You must select a channel or provide a channel ID.');
                    }

                    const body: IDataObject = {
                        email_ids: userEmails.split(',').map(email => email.trim()),
                    };

                    const responseData = await CliqApiRequest.call(this, 'POST', `api/v2/channels/${channel_id}/members`, body);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                } else if (resource === 'Channel' && operation === 'removeChannelMember') {
                    const channel = this.getNodeParameter('channel', i, '') as string;
                    const customChannelId = this.getNodeParameter('customChannelId', i, '') as string;
                    const userEmails = this.getNodeParameter('userEmails', i, '') as string;
                    const channel_id = customChannelId || channel;

                    if (!channel_id) {
                        throw new NodeOperationError(this.getNode(), 'You must select a channel or provide a channel ID.');
                    }

                    const body: IDataObject = {
                        email_ids: userEmails.split(',').map(email => email.trim()),
                    };

                    const responseData = await CliqApiRequest.call(this, 'DELETE', `api/v2/channels/${channel_id}/members`, body);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                } else if (resource === 'Channel' && operation === 'addBotToChannel') {
                    const botUniqueName = this.getNodeParameter('botUniqueName', i, '') as string;
                    const channel = this.getNodeParameter('channel', i, '') as string;
                    const customChannelUniquename = this.getNodeParameter('customChannelId', i, '') as string;
                    const channel_unique_name = customChannelUniquename || channel;

                    if (!channel_unique_name) {
                        throw new NodeOperationError(this.getNode(), 'You must select a channel or provide a channel ID.');
                    }

                    const body: IDataObject = {
                        channel_unique_name: channel_unique_name,
                    };

                    const responseData = await CliqApiRequest.call(this, 'POST', `api/v2/bots/${botUniqueName}/associate`, body);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                } else if (resource === 'Channel' && operation === 'archiveChannel') {
                    const channel = this.getNodeParameter('channel', i, '') as string;
                    const customChannelId = this.getNodeParameter('customChannelId', i, '') as string;
                    const channel_id = customChannelId || channel;

                    if (!channel_id) {
                        throw new NodeOperationError(this.getNode(), 'You must select a channel or provide a channel ID.');
                    }

                    const responseData = await CliqApiRequest.call(this, 'POST', `api/v2/channels/${channel_id}/archive`, {});
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                } else if (resource === 'Channel' && operation === 'deleteChannel') {
                    const channel = this.getNodeParameter('channel', i, '') as string;
                    const customChannelId = this.getNodeParameter('customChannelId', i, '') as string;
                    const channel_id = customChannelId || channel;

                    if (!channel_id) {
                        throw new NodeOperationError(this.getNode(), 'You must select a channel or provide a channel ID.');
                    }

                    const responseData = await CliqApiRequest.call(this, 'DELETE', `api/v2/channels/${channel_id}`, {});
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                } else if (resource === 'Channel' && operation === 'unarchiveChannel') {
                    const channel = this.getNodeParameter('channel', i, '') as string;
                    const customChannelId = this.getNodeParameter('customChannelId', i, '') as string;
                    const channel_id = customChannelId || channel;

                    if (!channel_id) {
                        throw new NodeOperationError(this.getNode(), 'You must select a channel or provide a channel ID.');
                    }

                    const responseData = await CliqApiRequest.call(this, 'POST', `api/v2/channels/${channel_id}/unarchive`, {});
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                } else if (resource === 'Channel' && operation === 'fetchChannel') {
                    const channel = this.getNodeParameter('channel', i, '') as string;
                    const customChannelId = this.getNodeParameter('customChannelId', i, '') as string;
                    const channel_id = customChannelId || channel;

                    if (!channel_id) {
                        throw new NodeOperationError(this.getNode(), 'You must select a channel or provide a channel ID.');
                    }


                    const responseData = await CliqApiRequest.call(this, 'GET', `api/v2/channels/${channel_id}`, {});
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                } else if (resource === 'Team' && operation === 'fetchTeam') {
                    const team = this.getNodeParameter('team', i, '') as string;
                    const teamId = this.getNodeParameter('teamId', i, '') as string;
                    const team_id = teamId || team;

                    if (!team_id) {
                        throw new NodeOperationError(this.getNode(), 'You must select a team or provide a team ID.');
                    }

                    const responseData = await CliqApiRequest.call(this, 'GET', `api/v2/teams/${team_id}`, {});
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                } else if (resource === 'Message' && operation === 'pinMessage') {
                    const chat = this.getNodeParameter('chat', i, '') as string;
                    const expiry_time = this.getNodeParameter('time', i, '') as string;
                    const preDefinedTime = this.getNodeParameter('expiryTime', i, '') as string;
                    const notify = this.getNodeParameter('notify', i, false) as boolean;
                    const customChatId = this.getNodeParameter('customChatId', i, '') as string;
                    const messageId = this.getNodeParameter('messageId', i) as string;
                    let expiryTime = expiry_time ? expiry_time : preDefinedTime;


                    // Get current timestamp in milliseconds
                    const currentTime = Date.now(); // already in milliseconds

                    if (expiryTime && expiryTime !== 'indefinite' && expiryTime !== "-1") {
                        // Ensure expiryTime is treated as milliseconds
                        const expiryMillis = parseInt(expiryTime);
                        const newExpiryTime = currentTime + expiryMillis;
                        expiryTime = newExpiryTime + ""; // convert to string if needed
                    }

                    const chat_id = customChatId ? customChatId : chat;


                    if (!chat_id) throw new NodeOperationError(this.getNode(), 'You must select a chat or provide a chat ID.');


                    const body: IDataObject = {
                        id: messageId,
                        expiry_time: expiryTime,
                        notify: notify,
                    };

                    const responseData = await CliqApiRequest.call(this, 'POST', `api/v2/chats/${chat_id}/stickymessage`, body);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                } else if (resource === 'Channel' && operation === 'createChannel') {
                    const channelName = this.getNodeParameter('channelName', i, '') as string;
                    const level = this.getNodeParameter('level', i, '') as string;
                    const teams = this.getNodeParameter('teams', i, []) as string[];
                    const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
                    const channelEmailIDs = (additionalFields.channelEmailIDs as string) ?? '';

                    const body: IDataObject = {
                        name: channelName,
                        description: additionalFields.channelDescription ?? '',
                        level: level,
                    };

                    if (level === 'team') {
                        if (teams.length === 0) {
                            throw new NodeOperationError(this.getNode(), 'You must select at least one team when level is set to team.');
                        }
                        body.team_ids = teams;
                    }

                    if (['private', 'external', 'organization'].includes(level) && channelEmailIDs) {
                        body.email_ids = channelEmailIDs.split(',').map(email => email.trim());
                    }

                    if (['organization', 'team'].includes(level)) {
                        body.invite_only = additionalFields.visibility ?? false;
                    }

                    const responseData = await CliqApiRequest.call(this, 'POST', `api/v2/channels`, body);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                } else if (resource === 'Channel' && operation === 'updateChannel') {
                    const channel = this.getNodeParameter('channel', i, '') as string;
                    const customChannelId = this.getNodeParameter('customChannelId', i, '') as string;
                    const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;
                    const level = (updateFields.level as string) ?? '';
                    const teams = (updateFields.teams as string[]) ?? [];
                    const channel_id = customChannelId || channel;

                    if (!channel_id) {
                        throw new NodeOperationError(this.getNode(), 'You must select a channel or provide a channel ID.');
                    }

                    if (Object.keys(updateFields).length === 0) {
                        throw new NodeOperationError(this.getNode(), 'Add at least one field under Update Fields.');
                    }

                    const body: IDataObject = {};

                    if (updateFields.channelName) body.name = updateFields.channelName;
                    if (updateFields.channelDescription) body.description = updateFields.channelDescription;
                    if (level) body.level = level;

                    if (level === 'team') {
                        if (teams.length === 0) {
                            throw new NodeOperationError(this.getNode(), 'You must select at least one team when level is set to team.');
                        }
                        body.team_ids = teams;
                    }

                    if (['organization', 'team'].includes(level)) {
                        body.invite_only = updateFields.visibility ?? false;
                    }

                    const responseData = await CliqApiRequest.call(this, 'PUT', `api/v2/channels/${channel_id}`, body);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                } else if (resource === 'Thread' && operation === 'updateThreadState') {
                    const threadChatId = this.getNodeParameter('threadChatId', i, '') as string;
                    const state = this.getNodeParameter('state', i, '') as string;
                    const queryString: IDataObject = {};
                    const body: IDataObject = {
                        action: state,
                    };

                    const responseData = await CliqApiRequest.call(this, 'PUT', `api/v2/threads/${threadChatId}`, body, queryString);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                }
            } catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: { error: error.message },
                        pairedItem: { item: i },
                    });
                    continue;
                }
                const nodeError = error instanceof NodeApiError || error instanceof NodeOperationError
                    ? error
                    : new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
                throw nodeError;
            }
        }

        return [returnData];
    }
}