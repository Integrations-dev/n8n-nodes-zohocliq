import type {
	IExecuteFunctions,
	IHookFunctions,
	IDataObject,
	ILoadOptionsFunctions,
	JsonObject,
	IHttpRequestMethods,
	IHttpRequestOptions
} from 'n8n-workflow';
import { NodeApiError, NodeOperationError } from 'n8n-workflow';

export function throwOnErrorStatus(
	this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions,
	responseData: {
		error?: Array<{ description: string; message: string }>;
	},
) {
	if (responseData.error?.[0].description) {
		throw new NodeOperationError(this.getNode(), responseData as Error);
	}
}

export async function CliqApiRequest(
	this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {}
) {
	const credentials = await this.getCredentials('zohoCliqOAuth2Api');
	const oauthTokenData = credentials.oauthTokenData as IDataObject;
	const apiDomainUrl = oauthTokenData?.api_domain ? new URL(oauthTokenData.api_domain as string).hostname.replace('www.', '') : 'zoho.com';
	const options: IHttpRequestOptions = {
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
		const responseData = await this.helpers.httpRequestWithAuthentication?.call(this, 'zohoCliqOAuth2Api', options);
		if (responseData === undefined) return [];

		throwOnErrorStatus.call(this, responseData as IDataObject);

		return responseData;
	} catch (error) {
		const args = error ? {
			message: error.context?.data?.code || error.message || 'The Zoho Cliq API returned an error.',
		}
			: undefined;


		throw new NodeApiError(this.getNode(), error as JsonObject, args);
	}
}

export function getDomain(domain: string): string | undefined {
	const value: { [key: string]: string } = {
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

export async function getTeamsList(this: ILoadOptionsFunctions) {
	const queryString: IDataObject = {
		joined: 'true',
	}

	const responseData = (await CliqApiRequest.call(
		this,
		'GET',
		'api/v2/teams',
		{},
		queryString,
	));


	let teams = [];
	teams = responseData.teams.map((team: { name: string; team_id: string }) => ({
		name: team.name,
		value: team.team_id,
	}));
	teams.unshift({ name: "Custom", value: "Custom_Team_Selected" });

	return teams;
}

export async function getTeamsListWithoutCustom(this: ILoadOptionsFunctions) {
	const queryString: IDataObject = {
		joined: 'true',
	}

	const responseData = (await CliqApiRequest.call(
		this,
		'GET',
		'api/v2/teams',
		{},
		queryString,
	));


	let teams = [];
	teams = responseData.teams.map((team: { name: string; team_id: string }) => ({
		name: team.name,
		value: team.team_id,
	}));

	return teams;
}

export async function getChannelsList(this: ILoadOptionsFunctions) {
	const queryString: IDataObject = {
		joined: 'true',
	}

	const responseData = (await CliqApiRequest.call(
		this,
		'GET',
		'api/v2/channels',
		{},
		queryString,
	));


	let channels = [];
	channels = responseData.channels.map((channel: { name: string; channel_id: string }) => ({
		name: channel.name,
		value: channel.channel_id,
	}));
	channels.unshift({ name: "Custom", value: "Custom_Channel_Selected" });

	return channels;
}

export async function getChannelsWithUniqueNameList(this: ILoadOptionsFunctions) {
	const queryString: IDataObject = {
		joined: 'true',
		order_by: '-last_modified_time'
	}

	const responseData = (await CliqApiRequest.call(
		this,
		'GET',
		'api/v2/channels',
		{},
		queryString,
	));



	let channels = [];
	channels = responseData.channels.map((channel: { name: string; unique_name: string }) => ({
		name: channel.name,
		value: channel.unique_name,
	}));
	channels.unshift({ name: "Custom", value: "Custom_Channel_Selected" });
	return channels;
}

export async function getUsersList(this: ILoadOptionsFunctions) {
	const queryString: IDataObject = {
		status: 'active',
		limit: 100,
		sort_by: 'usage',
	}

	const responseData = (await CliqApiRequest.call(
		this,
		'GET',
		'api/v2/users',
		{},
		queryString
	));


	let users = [];


	users = responseData.data.map((user: { display_name: string; email_id: string }) => ({
		name: user.display_name,
		value: user.email_id,
	}));
	users.unshift({ name: "Custom", value: "Custom_User_Selected" });

	return users;
}

export async function getChatsList(this: ILoadOptionsFunctions) {
	const queryString: IDataObject = {
		limit: 100,
	}

	const responseData = (await CliqApiRequest.call(
		this,
		'GET',
		'api/v2/chats',
		{},
		queryString
	));


	let chats = [];


	chats = responseData.chats.map((chat: { name: string; chat_id: string }) => ({
		name: chat.name,
		value: chat.chat_id,
	}));
	chats.unshift({ name: "Custom", value: "Custom_Chat_Selected" });

	return chats;
}

export async function getUserStatusesList(this: ILoadOptionsFunctions) {
	const responseData = (await CliqApiRequest.call(
		this,
		'GET',
		'api/v2/statuses',
	));

	return responseData.data.map((status: { id: string; message: string }) => ({
		name: status.message,
		value: status.id,
	}));
}