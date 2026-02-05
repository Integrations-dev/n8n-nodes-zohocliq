import type { INodeProperties } from "n8n-workflow";

export const channelOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: [
                    'Channel',
                ],
            },
        },
        options: [
            {
                name: 'Add Bot to Channel',
                value: 'addBotToChannel',
                action: 'Add bot to channel',
                description: 'Add a bot to a channel',
            },
            {
                name: 'Archive Channel',
                value: 'archiveChannel',
                action: 'Archive channel',
                description: 'Archive a channel',
            },
            {
                name: 'Create Channel',
                value: 'createChannel',
                action: 'Create channel',
                description: 'Create a new channel',
            },
            {
                name: 'Delete Channel',
                value: 'deleteChannel',
                action: 'Delete channel',
                description: 'Delete a channel',
            },
            {
                name: 'Fetch Channel',
                value: 'fetchChannel',
                action: 'Fetch channel',
                description: 'Fetch details of a specific channel',
            },
            {
                name: 'Unarchive Channel',
                value: 'unarchiveChannel',
                action: 'Unarchive channel',
                description: 'Unarchive a channel',
            },
            {
                name: 'Update Channel',
                value: 'updateChannel',
                action: 'Update channel',
                description: 'Update details of a specific channel',
            },
            {
                name: `Add channel members`,
                value: 'addUsersToChannel',
                action: `Add channel members`,
                description: 'Add users to a channel',
            },
            {
                name: 'Remove Channel Members',
                value: 'removeChannelMember',
                action: 'Remove channel member',
                description: 'Remove a member from a channel',
            },
            
        ],
        default: 'createChannel',
    },
]

export const channelFields: INodeProperties[] = [
    {
        displayName: 'Channel',
        name: 'channel',
        type: 'options',
        required: true,
        placeholder: "Select a channel",
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ["Channel"],
                operation: ['Channel', 'ChannelAsBot', 'Thread', "addUsersToChannel", 'removeChannelMember', 'archiveChannel', 'deleteChannel', 'fetchChannel', 'unarchiveChannel', 'updateChannel'],
            },
        },
        options: [], // Placeholder for dynamically fetched channels
        default: '',
        typeOptions: {
            loadOptionsMethod: 'getChannels',
        },
    },
    {
        displayName: 'Channel',
        name: 'channel',
        type: 'options',
        required: true,
        placeholder: "Select a channel",
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ["Channel"],
                operation: ['addBotToChannel'],
            },
        },
        options: [], // Placeholder for dynamically fetched channels
        default: '',
        typeOptions: {
            loadOptionsMethod: 'getChannelsWithUniqueName',
        },
    },
    {
        displayName: 'Channel Unique Name',
        name: 'customChannelId',
        type: 'string',
        placeholder: "Enter the channel unique name",
        required: true,
        displayOptions: {
            show: {
                resource: ["Channel"],
                operation: ['addBotToChannel'],
                channel: ['Custom_Channel_Selected'],
            },
        },
        default: '',
    },
    {
        displayName: 'Bot Unique Name',
        name: 'botUniqueName',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['Channel'],
                operation: ['addBotToChannel'],
            },
        },
        default: '',
        placeholder: 'Enter the bot\'s unique name',
        description: 'Send a message in a channel as a bot. The bot must already be a participant in the channel. You can find the bot’s unique name in the bot’s API endpoint URL.',
    },
    {
        displayName: 'Channel ID',
        name: 'customChannelId',
        required: true,
        type: 'string',
        placeholder: "Enter the channel ID",
        displayOptions: {
            show: {
                channel: ['Custom_Channel_Selected'],
                resource: ["Channel"],
                operation: ['Channel', "ChannelAsBot", "Thread", 'addUsersToChannel', 'removeChannelMember', 'archiveChannel', 'deleteChannel', 'fetchChannel', 'unarchiveChannel', 'updateChannel'],
            },
        },
        default: '',
    },

    {
        displayName: 'Channel Name',
        name: 'channelName',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['Channel'],
                operation: ['createChannel', 'updateChannel'],
            },
        },
        default: '',
        placeholder: 'Enter the channel name',
    },
    {
        displayName: 'Channel Description',
        name: 'channelDescription',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['Channel'],
                operation: ['createChannel', 'updateChannel'],
            },
        },
        default: '',
        placeholder: 'Enter a description for the channel',
    },
    {
        displayName: 'Channel Type',
        name: 'level',
        type: 'options',
        required: true,
        placeholder: "Select the type of channel",
        displayOptions: {
            show: {
                resource: ['Channel'],
                operation: ['createChannel', 'updateChannel'],
            },
        },
        options: [
            {
                name: 'Organization - Anyone in Your Organization Can Access and Join.',
                value: 'organization'
            },
            {
                name: 'Team - Only Selected Members of Your Organization Group Can Access and Join.',
                value: 'team'
            },
            {
                name: 'Personal - Only Invited Users From Your Organization Can Join',
                value: 'private'
            },
            {
                name: 'External - Invited Users From Any Organization Can Join',
                value: 'external'
            }
        ],
        default: 'private',
    },
    {
        displayName: 'Select Your Teams',
        name: 'teams',
        type: 'multiOptions',
        placeholder: "Select your teams",
        required: true,
        displayOptions: {
            show: {
                resource: ['Channel'],
                operation: ['createChannel', 'updateChannel'],
                level: ['team'],
            },
        },
        options: [],
        default: [],
        typeOptions: {
            loadOptionsMethod: 'getTeamsWithoutCustom',
        },
    },
    {
        displayName: 'Email Address',
        name: 'channelEmailIDs',
        placeholder: "Enter the email address of the user",
        type: 'string',
        displayOptions: {
            show: {
                resource: ['Channel'],
                operation: ['createChannel', 'updateChannel'],
                level: ['private', 'external', 'organization'],
            },
        },
        default: '',
        description: 'Enter the email addresses of users to be added to the channel. Separate multiple email addresses with commas.',
    },
    {
        displayName: 'Visibility',
        name: 'visibility',
        type: 'boolean',
        displayOptions: {
            show: {
                level: ['organization', 'team'], // This ensures the field is shown only when "level" is "organization"
            },
        },
        default: false,
        description: 'Set whether the channel is visible to everyone in the organization/ Team',
    },

    {
        displayName: 'Email IDs/ ZUIDs',
        name: 'userEmails',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['Channel'],
                operation: ['addUsersToChannel', 'removeChannelMember'],
            },
        },
        default: '',
        placeholder: 'zylker@zoho.com,tim.harrison@zylker.com'
    },
]