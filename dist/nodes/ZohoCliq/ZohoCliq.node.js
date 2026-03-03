"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZohoCliq = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const CommonUtils_1 = require("./CommonUtils");
const MessageResource_1 = require("./resources/MessageResource");
const UsersResource_1 = require("./resources/UsersResource");
const ChannelResource_1 = require("./resources/ChannelResource");
const TeamResource_1 = require("./resources/TeamResource");
class ZohoCliq {
    constructor() {
        this.description = {
            displayName: 'Zoho Cliq',
            name: 'zohoCliq',
            icon: 'file:cliq.svg',
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Consume Zoho Cliq API',
            defaults: {
                name: 'Zoho Cliq',
            },
            inputs: ['main'],
            outputs: ['main'],
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
                            name: 'Message',
                            value: 'Message',
                        },
                        {
                            name: 'User',
                            value: 'Users',
                        },
                        {
                            name: 'Channel',
                            value: 'Channel',
                        },
                        {
                            name: 'Team',
                            value: 'Team'
                        }
                    ],
                    default: 'Message',
                },
                ...MessageResource_1.messageOperations,
                ...MessageResource_1.messageFields,
                ...UsersResource_1.userOperations,
                ...UsersResource_1.userFields,
                ...ChannelResource_1.channelOperations,
                ...ChannelResource_1.channelFields,
                ...TeamResource_1.teamOperations,
                ...TeamResource_1.teamFields,
            ],
            usableAsTool: true
        };
        this.methods = {
            loadOptions: {
                async getTeams() {
                    return CommonUtils_1.getTeamsList.call(this);
                },
                async getTeamsWithoutCustom() {
                    return CommonUtils_1.getTeamsListWithoutCustom.call(this);
                },
                async getChannels() {
                    return CommonUtils_1.getChannelsList.call(this);
                },
                async getChannelsWithUniqueName() {
                    return CommonUtils_1.getChannelsWithUniqueNameList.call(this);
                },
                async getUsers() {
                    return CommonUtils_1.getUsersList.call(this);
                },
                async getChats() {
                    return CommonUtils_1.getChatsList.call(this);
                },
                async getUserStatuses() {
                    return CommonUtils_1.getUserStatusesList.call(this);
                }
            },
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            try {
                const resource = this.getNodeParameter('resource', i);
                const operation = this.getNodeParameter('operation', i);
                if (resource === 'Message' && (operation === 'Channel' || operation === 'ChannelAsBot')) {
                    const channel = this.getNodeParameter('channel', i, '');
                    const customChannelId = this.getNodeParameter('customChannelId', i, '');
                    const text = this.getNodeParameter('text', i);
                    const botUniqueName = this.getNodeParameter('botUniqueName', i, '');
                    const sync = this.getNodeParameter('sync', i, false);
                    const botName = this.getNodeParameter('botName', i, '');
                    const botIconURL = this.getNodeParameter('botIconURL', i, '');
                    const cardTheme = this.getNodeParameter('cardTheme', i, 'none');
                    const cardTitle = this.getNodeParameter('cardTitle', i, '');
                    const cardIconURL = this.getNodeParameter('cardIconURL', i, '');
                    const cardThumbnailURL = this.getNodeParameter('cardThumbnailURL', i, '');
                    const queryString = {};
                    const botObject = {};
                    const cardObject = {};
                    if (botName)
                        botObject.name = botName;
                    if (botIconURL)
                        botObject.image = botIconURL;
                    if (cardTheme && cardTheme !== 'none') {
                        cardObject.theme = cardTheme;
                        if (cardTitle)
                            cardObject.title = cardTitle;
                        if (cardIconURL)
                            cardObject.icon = cardIconURL;
                        if (cardThumbnailURL)
                            cardObject.thumbnail = cardThumbnailURL;
                    }
                    const body = {
                        text,
                        sync_message: sync,
                    };
                    if (Object.keys(botObject).length > 0)
                        body.bot = botObject;
                    if (Object.keys(cardObject).length > 0)
                        body.card = cardObject;
                    const channel_id = customChannelId || channel;
                    if (!channel_id) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'You must select a channel or provide a channel ID.');
                    }
                    if (botUniqueName)
                        queryString.bot_unique_name = botUniqueName;
                    const responseData = await CommonUtils_1.CliqApiRequest.call(this, 'POST', `api/v2/channels/${channel_id}/message`, body, queryString);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                }
                else if (resource === 'Message' && operation === 'Chat') {
                    const chat = this.getNodeParameter('chat', i, '');
                    const customChatId = this.getNodeParameter('customChatId', i, '');
                    const text = this.getNodeParameter('text', i);
                    const sync = this.getNodeParameter('sync', i, false);
                    const botName = this.getNodeParameter('botName', i, '');
                    const botIconURL = this.getNodeParameter('botIconURL', i, '');
                    const cardTheme = this.getNodeParameter('cardTheme', i, 'none');
                    const cardTitle = this.getNodeParameter('cardTitle', i, '');
                    const cardIconURL = this.getNodeParameter('cardIconURL', i, '');
                    const cardThumbnailURL = this.getNodeParameter('cardThumbnailURL', i, '');
                    const botObject = {};
                    const cardObject = {};
                    if (botName)
                        botObject.name = botName;
                    if (botIconURL)
                        botObject.image = botIconURL;
                    if (cardTheme && cardTheme !== 'none') {
                        cardObject.theme = cardTheme;
                        if (cardTitle)
                            cardObject.title = cardTitle;
                        if (cardIconURL)
                            cardObject.icon = cardIconURL;
                        if (cardThumbnailURL)
                            cardObject.thumbnail = cardThumbnailURL;
                    }
                    const body = {
                        text,
                        sync_message: sync,
                    };
                    if (Object.keys(botObject).length > 0)
                        body.bot = botObject;
                    if (Object.keys(cardObject).length > 0)
                        body.card = cardObject;
                    const chat_id = customChatId || chat;
                    if (!chat_id) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'You must select a chat or provide a chat ID.');
                    }
                    const responseData = await CommonUtils_1.CliqApiRequest.call(this, 'POST', `api/v2/chats/${chat_id}/message`, body);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                }
                else if (resource === 'Message' && operation === 'DM') {
                    const user = this.getNodeParameter('user', i, '');
                    const customEmailID = this.getNodeParameter('customUserId', i, '');
                    const text = this.getNodeParameter('text', i);
                    const sync = this.getNodeParameter('sync', i, false);
                    const botName = this.getNodeParameter('botName', i, '');
                    const botIconURL = this.getNodeParameter('botIconURL', i, '');
                    const cardTheme = this.getNodeParameter('cardTheme', i, 'none');
                    const cardTitle = this.getNodeParameter('cardTitle', i, '');
                    const cardIconURL = this.getNodeParameter('cardIconURL', i, '');
                    const cardThumbnailURL = this.getNodeParameter('cardThumbnailURL', i, '');
                    const botObject = {};
                    const cardObject = {};
                    if (botName)
                        botObject.name = botName;
                    if (botIconURL)
                        botObject.image = botIconURL;
                    if (cardTheme && cardTheme !== 'none') {
                        cardObject.theme = cardTheme;
                        if (cardTitle)
                            cardObject.title = cardTitle;
                        if (cardIconURL)
                            cardObject.icon = cardIconURL;
                        if (cardThumbnailURL)
                            cardObject.thumbnail = cardThumbnailURL;
                    }
                    const body = {
                        text,
                        sync_message: sync,
                    };
                    if (Object.keys(botObject).length > 0)
                        body.bot = botObject;
                    if (Object.keys(cardObject).length > 0)
                        body.card = cardObject;
                    const email_Id = customEmailID || user;
                    if (!email_Id) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'You must select a user or provide a email ID.');
                    }
                    const responseData = await CommonUtils_1.CliqApiRequest.call(this, 'POST', `api/v2/buddies/${email_Id}/message`, body);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                }
                else if (resource === 'Users' && operation === 'retrieveUser') {
                    const ID = this.getNodeParameter('emailIDorZUID', i, '');
                    if (!ID) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'You must provide an email ID/ ZUID.');
                    }
                    const queryString = {
                        fields: 'all',
                    };
                    const responseData = await CommonUtils_1.CliqApiRequest.call(this, 'GET', `api/v2/users/${ID}`, {}, queryString);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                }
                else if (resource === 'Message' && operation === 'Thread') {
                    const channel = this.getNodeParameter('channel', i, '');
                    const customChannelId = this.getNodeParameter('customChannelId', i, '');
                    const messageId = this.getNodeParameter('messageId', i);
                    const threadTitle = this.getNodeParameter('threadTitle', i);
                    const postInParentChannel = this.getNodeParameter('postInChannel', i);
                    const text = this.getNodeParameter('text', i);
                    const sync = this.getNodeParameter('sync', i, false);
                    const botName = this.getNodeParameter('botName', i, '');
                    const botIconURL = this.getNodeParameter('botIconURL', i, '');
                    const cardTheme = this.getNodeParameter('cardTheme', i, 'none');
                    const cardTitle = this.getNodeParameter('cardTitle', i, '');
                    const cardIconURL = this.getNodeParameter('cardIconURL', i, '');
                    const cardThumbnailURL = this.getNodeParameter('cardThumbnailURL', i, '');
                    const botObject = {};
                    const cardObject = {};
                    if (botName)
                        botObject.name = botName;
                    if (botIconURL)
                        botObject.image = botIconURL;
                    if (cardTheme && cardTheme !== 'none') {
                        cardObject.theme = cardTheme;
                        if (cardTitle)
                            cardObject.title = cardTitle;
                        if (cardIconURL)
                            cardObject.icon = cardIconURL;
                        if (cardThumbnailURL)
                            cardObject.thumbnail = cardThumbnailURL;
                    }
                    const channel_id = customChannelId || channel;
                    if (!channel_id) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'You must select a channel or provide a channel ID.');
                    }
                    const body = {
                        thread_title: threadTitle,
                        text: text,
                        thread_message_id: messageId,
                        post_in_parent: postInParentChannel,
                        sync_message: sync,
                    };
                    if (Object.keys(botObject).length > 0)
                        body.bot = botObject;
                    if (Object.keys(cardObject).length > 0)
                        body.card = cardObject;
                    const responseData = await CommonUtils_1.CliqApiRequest.call(this, 'POST', `api/v2/channels/${channel_id}/message`, body);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                }
                else if (resource === 'Users' && operation === 'addUserStatus') {
                    const statusCode = this.getNodeParameter('statusCode', i, '');
                    const statusMessage = this.getNodeParameter('statusMessage', i, '');
                    const body = {
                        code: statusCode,
                        message: statusMessage,
                    };
                    const responseData = await CommonUtils_1.CliqApiRequest.call(this, 'POST', `api/v2/statuses`, body);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                }
                else if (resource === 'Users' && operation === 'setUserStatus') {
                    const status = this.getNodeParameter('status', i, '');
                    if (!status) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'You must provide a status.');
                    }
                    const responseData = await CommonUtils_1.CliqApiRequest.call(this, 'PUT', `api/v2/statuses/${status}/set`, {});
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                }
                else if (resource === 'Channel' && operation === 'addUsersToChannel') {
                    const channel = this.getNodeParameter('channel', i, '');
                    const customChannelId = this.getNodeParameter('customChannelId', i, '');
                    const userEmails = this.getNodeParameter('userEmails', i, '');
                    const channel_id = customChannelId || channel;
                    if (!channel_id) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'You must select a channel or provide a channel ID.');
                    }
                    const body = {
                        email_ids: userEmails.split(',').map(email => email.trim()),
                    };
                    const responseData = await CommonUtils_1.CliqApiRequest.call(this, 'POST', `api/v2/channels/${channel_id}/members`, body);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                }
                else if (resource === 'Channel' && operation === 'removeChannelMember') {
                    const channel = this.getNodeParameter('channel', i, '');
                    const customChannelId = this.getNodeParameter('customChannelId', i, '');
                    const userEmails = this.getNodeParameter('userEmails', i, '');
                    const channel_id = customChannelId || channel;
                    if (!channel_id) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'You must select a channel or provide a channel ID.');
                    }
                    const body = {
                        email_ids: userEmails.split(',').map(email => email.trim()),
                    };
                    const responseData = await CommonUtils_1.CliqApiRequest.call(this, 'DELETE', `api/v2/channels/${channel_id}/members`, body);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                }
                else if (resource === 'Channel' && operation === 'addBotToChannel') {
                    const botUniqueName = this.getNodeParameter('botUniqueName', i, '');
                    const channel = this.getNodeParameter('channel', i, '');
                    const customChannelUniquename = this.getNodeParameter('customChannelId', i, '');
                    const channel_unique_name = customChannelUniquename || channel;
                    if (!channel_unique_name) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'You must select a channel or provide a channel ID.');
                    }
                    const body = {
                        channel_unique_name: channel_unique_name,
                    };
                    const responseData = await CommonUtils_1.CliqApiRequest.call(this, 'POST', `api/v2/bots/${botUniqueName}/associate`, body);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                }
                else if (resource === 'Channel' && operation === 'archiveChannel') {
                    const channel = this.getNodeParameter('channel', i, '');
                    const customChannelId = this.getNodeParameter('customChannelId', i, '');
                    const channel_id = customChannelId || channel;
                    if (!channel_id) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'You must select a channel or provide a channel ID.');
                    }
                    const responseData = await CommonUtils_1.CliqApiRequest.call(this, 'POST', `api/v2/channels/${channel_id}/archive`, {});
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                }
                else if (resource === 'Channel' && operation === 'deleteChannel') {
                    const channel = this.getNodeParameter('channel', i, '');
                    const customChannelId = this.getNodeParameter('customChannelId', i, '');
                    const channel_id = customChannelId || channel;
                    if (!channel_id) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'You must select a channel or provide a channel ID.');
                    }
                    const responseData = await CommonUtils_1.CliqApiRequest.call(this, 'DELETE', `api/v2/channels/${channel_id}`, {});
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                }
                else if (resource === 'Channel' && operation === 'unarchiveChannel') {
                    const channel = this.getNodeParameter('channel', i, '');
                    const customChannelId = this.getNodeParameter('customChannelId', i, '');
                    const channel_id = customChannelId || channel;
                    if (!channel_id) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'You must select a channel or provide a channel ID.');
                    }
                    const responseData = await CommonUtils_1.CliqApiRequest.call(this, 'POST', `api/v2/channels/${channel_id}/unarchive`, {});
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                }
                else if (resource === 'Channel' && operation === 'fetchChannel') {
                    const channel = this.getNodeParameter('channel', i, '');
                    const customChannelId = this.getNodeParameter('customChannelId', i, '');
                    const channel_id = customChannelId || channel;
                    if (!channel_id) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'You must select a channel or provide a channel ID.');
                    }
                    const responseData = await CommonUtils_1.CliqApiRequest.call(this, 'GET', `api/v2/channels/${channel_id}`, {});
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                }
                else if (resource === 'Team' && operation === 'fetchTeam') {
                    const team = this.getNodeParameter('team', i, '');
                    const teamId = this.getNodeParameter('teamId', i, '');
                    const team_id = teamId || team;
                    if (!team_id) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'You must select a team or provide a team ID.');
                    }
                    const responseData = await CommonUtils_1.CliqApiRequest.call(this, 'GET', `api/v2/teams/${team_id}`, {});
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                }
                else if (resource === 'Message' && operation === 'pinMessage') {
                    const chat = this.getNodeParameter('chat', i, '');
                    const expiry_time = this.getNodeParameter('time', i, '');
                    const preDefinedTime = this.getNodeParameter('expiryTime', i, '');
                    const notify = this.getNodeParameter('notify', i, false);
                    const customChatId = this.getNodeParameter('customChatId', i, '');
                    const messageId = this.getNodeParameter('messageId', i);
                    let expiryTime = expiry_time ? expiry_time : preDefinedTime;
                    const currentTime = Date.now();
                    if (expiryTime && expiryTime !== 'indefinite' && expiryTime !== "-1") {
                        const expiryMillis = parseInt(expiryTime);
                        const newExpiryTime = currentTime + expiryMillis;
                        expiryTime = newExpiryTime + "";
                    }
                    const chat_id = customChatId ? customChatId : chat;
                    if (!chat_id)
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'You must select a chat or provide a chat ID.');
                    const body = {
                        id: messageId,
                        expiry_time: expiryTime,
                        notify: notify,
                    };
                    const responseData = await CommonUtils_1.CliqApiRequest.call(this, 'POST', `api/v2/chats/${chat_id}/stickymessage`, body);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                }
                else if (resource === 'Channel' && operation === 'createChannel') {
                    const channelName = this.getNodeParameter('channelName', i, '');
                    const channelDescription = this.getNodeParameter('channelDescription', i, '');
                    const level = this.getNodeParameter('level', i, '');
                    const teams = this.getNodeParameter('teams', i, []);
                    const channelEmailIDs = this.getNodeParameter('channelEmailIDs', i, '');
                    const visibility = this.getNodeParameter('visibility', i, false);
                    const body = {
                        name: channelName,
                        description: channelDescription,
                        level: level,
                    };
                    if (level === 'team') {
                        if (teams.length === 0) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'You must select at least one team when level is set to team.');
                        }
                        body.team_ids = teams;
                    }
                    if (['private', 'external', 'organization'].includes(level) && channelEmailIDs) {
                        body.email_ids = channelEmailIDs.split(',').map(email => email.trim());
                    }
                    if (['organization', 'team'].includes(level)) {
                        body.invite_only = visibility;
                    }
                    const responseData = await CommonUtils_1.CliqApiRequest.call(this, 'POST', `api/v2/channels`, body);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                }
                else if (resource === 'Channel' && operation === 'updateChannel') {
                    const channel = this.getNodeParameter('channel', i, '');
                    const customChannelId = this.getNodeParameter('customChannelId', i, '');
                    const channelName = this.getNodeParameter('channelName', i, '');
                    const channelDescription = this.getNodeParameter('channelDescription', i, '');
                    const level = this.getNodeParameter('level', i, '');
                    const teams = this.getNodeParameter('teams', i, []);
                    const channelEmailIDs = this.getNodeParameter('channelEmailIDs', i, '');
                    const visibility = this.getNodeParameter('visibility', i, false);
                    const channel_id = customChannelId || channel;
                    if (!channel_id) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'You must select a channel or provide a channel ID.');
                    }
                    const body = {
                        name: channelName,
                        description: channelDescription,
                        level: level,
                    };
                    if (level === 'team') {
                        if (teams.length === 0) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'You must select at least one team when level is set to team.');
                        }
                        body.team_ids = teams;
                    }
                    if (['private', 'external', 'organization'].includes(level) && channelEmailIDs) {
                        body.email_ids = channelEmailIDs.split(',').map(email => email.trim());
                    }
                    if (['organization', 'team'].includes(level)) {
                        body.invite_only = visibility;
                    }
                    const responseData = await CommonUtils_1.CliqApiRequest.call(this, 'PUT', `api/v2/channels/${channel_id}`, body);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                }
                else if (resource === 'Message' && operation === 'updateThreadState') {
                    const threadChatId = this.getNodeParameter('threadChatId', i, '');
                    const state = this.getNodeParameter('state', i, '');
                    const queryString = {};
                    const body = {
                        action: state,
                    };
                    const responseData = await CommonUtils_1.CliqApiRequest.call(this, 'PUT', `api/v2/threads/${threadChatId}`, body, queryString);
                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                }
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: { error: error.message },
                        pairedItem: { item: i },
                    });
                    continue;
                }
                throw error;
            }
        }
        return [returnData];
    }
}
exports.ZohoCliq = ZohoCliq;
//# sourceMappingURL=ZohoCliq.node.js.map