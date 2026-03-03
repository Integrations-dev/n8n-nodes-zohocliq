"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwOnErrorStatus = throwOnErrorStatus;
exports.CliqApiRequest = CliqApiRequest;
exports.getDomain = getDomain;
exports.getTeamsList = getTeamsList;
exports.getTeamsListWithoutCustom = getTeamsListWithoutCustom;
exports.getChannelsList = getChannelsList;
exports.getChannelsWithUniqueNameList = getChannelsWithUniqueNameList;
exports.getUsersList = getUsersList;
exports.getChatsList = getChatsList;
exports.getUserStatusesList = getUserStatusesList;
const n8n_workflow_1 = require("n8n-workflow");
function throwOnErrorStatus(responseData) {
    var _a;
    if ((_a = responseData.error) === null || _a === void 0 ? void 0 : _a[0].description) {
        throw new n8n_workflow_1.NodeOperationError(this.getNode(), responseData);
    }
}
async function CliqApiRequest(method, endpoint, body = {}, qs = {}) {
    var _a, _b, _c;
    const credentials = await this.getCredentials('zohoCliqOAuth2Api');
    const oauthTokenData = credentials.oauthTokenData;
    const apiDomainUrl = (oauthTokenData === null || oauthTokenData === void 0 ? void 0 : oauthTokenData.api_domain) ? new URL(oauthTokenData.api_domain).hostname.replace('www.', '') : 'zoho.com';
    const options = {
        headers: { "user-agent": "n8n zohocliq" },
        body,
        method,
        qs,
        url: `https://cliq.${getDomain(apiDomainUrl)}/${endpoint}`,
        json: true,
    };
    if (!Object.keys(body).length) {
        delete options.body;
    }
    if (!Object.keys(qs).length) {
        delete options.qs;
    }
    try {
        const responseData = await ((_a = this.helpers.httpRequestWithAuthentication) === null || _a === void 0 ? void 0 : _a.call(this, 'zohoCliqOAuth2Api', options));
        if (responseData === undefined)
            return [];
        throwOnErrorStatus.call(this, responseData);
        return responseData;
    }
    catch (error) {
        const args = error ? {
            message: ((_c = (_b = error.context) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.code) || error.message || 'The Zoho Cliq API returned an error.',
        }
            : undefined;
        throw new n8n_workflow_1.NodeApiError(this.getNode(), error, args);
    }
}
function getDomain(domain) {
    const value = {
        ".com": "zoho.com",
        ".eu": "zoho.eu",
        ".com.cn": "zoho.com.cn",
        ".com.au": "zoho.com.au",
        ".in": "zoho.in",
        ".ca": "zohocloud.ca",
        ".sa": "zoho.sa",
        ".jp": "zoho.jp"
    };
    const suffixes = new Set(Object.keys(value));
    for (const key of suffixes) {
        if (domain.endsWith(key)) {
            return value[key];
        }
    }
    return undefined;
}
async function getTeamsList() {
    const queryString = {
        joined: 'true',
    };
    const responseData = (await CliqApiRequest.call(this, 'GET', 'api/v2/teams', {}, queryString));
    let teams = [];
    teams = responseData.teams.map((team) => ({
        name: team.name,
        value: team.team_id,
    }));
    teams.unshift({ name: "Custom", value: "Custom_Team_Selected" });
    return teams;
}
async function getTeamsListWithoutCustom() {
    const queryString = {
        joined: 'true',
    };
    const responseData = (await CliqApiRequest.call(this, 'GET', 'api/v2/teams', {}, queryString));
    let teams = [];
    teams = responseData.teams.map((team) => ({
        name: team.name,
        value: team.team_id,
    }));
    return teams;
}
async function getChannelsList() {
    const queryString = {
        joined: 'true',
    };
    const responseData = (await CliqApiRequest.call(this, 'GET', 'api/v2/channels', {}, queryString));
    let channels = [];
    channels = responseData.channels.map((channel) => ({
        name: channel.name,
        value: channel.channel_id,
    }));
    channels.unshift({ name: "Custom", value: "Custom_Channel_Selected" });
    return channels;
}
async function getChannelsWithUniqueNameList() {
    const queryString = {
        joined: 'true',
        order_by: '-last_modified_time'
    };
    const responseData = (await CliqApiRequest.call(this, 'GET', 'api/v2/channels', {}, queryString));
    let channels = [];
    channels = responseData.channels.map((channel) => ({
        name: channel.name,
        value: channel.unique_name,
    }));
    channels.unshift({ name: "Custom", value: "Custom_Channel_Selected" });
    return channels;
}
async function getUsersList() {
    const queryString = {
        status: 'active',
        limit: 100,
        sort_by: 'usage',
    };
    const responseData = (await CliqApiRequest.call(this, 'GET', 'api/v2/users', {}, queryString));
    let users = [];
    users = responseData.data.map((user) => ({
        name: user.display_name,
        value: user.email_id,
    }));
    users.unshift({ name: "Custom", value: "Custom_User_Selected" });
    return users;
}
async function getChatsList() {
    const queryString = {
        limit: 100,
    };
    const responseData = (await CliqApiRequest.call(this, 'GET', 'api/v2/chats', {}, queryString));
    let chats = [];
    chats = responseData.chats.map((chat) => ({
        name: chat.name,
        value: chat.chat_id,
    }));
    chats.unshift({ name: "Custom", value: "Custom_Chat_Selected" });
    return chats;
}
async function getUserStatusesList() {
    const responseData = (await CliqApiRequest.call(this, 'GET', 'api/v2/statuses'));
    return responseData.data.map((status) => ({
        name: status.message,
        value: status.id,
    }));
}
//# sourceMappingURL=CommonUtils.js.map