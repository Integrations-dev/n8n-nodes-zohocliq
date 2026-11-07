import type { INodeProperties, INodePropertyOptions } from "n8n-workflow";

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
                name: `Add Channel Members`,
                value: 'addUsersToChannel',
                action: `Add channel members`,
                description: 'Add users to a channel',
            },
            {
                name: 'Archive',
                value: 'archiveChannel',
                action: 'Archive channel',
                description: 'Archive a channel',
            },
            {
                name: 'Create',
                value: 'createChannel',
                action: 'Create channel',
                description: 'Create a new channel',
            },
            {
                name: 'Delete',
                value: 'deleteChannel',
                action: 'Delete channel',
                description: 'Delete a channel',
            },
            {
                name: 'Fetch',
                value: 'fetchChannel',
                action: 'Fetch channel',
                description: 'Fetch details of a specific channel',
            },
            {
                name: 'Remove Channel Members',
                value: 'removeChannelMember',
                action: 'Remove channel member',
                description: 'Remove a member from a channel',
            },
            {
                name: 'Unarchive',
                value: 'unarchiveChannel',
                action: 'Unarchive channel',
                description: 'Unarchive a channel',
            },
            {
                name: 'Update',
                value: 'updateChannel',
                action: 'Update channel',
                description: 'Update details of a specific channel',
            }
        ],
        default: 'createChannel',
    },
]

// Shared by Channel → Create (top level / Additional Fields) and Channel → Update (Update Fields)
const channelTypeOptions: INodePropertyOptions[] = [
    {
        name: 'Organization',
        value: 'organization',
        description: 'Anyone in your organization can access and join this channel'
    },
    {
        name: 'Team',
        value: 'team',
        description: 'Only selected members of your organization group can access and join this channel'
    },
    {
        name: 'Personal',
        value: 'private',
        description: 'Only invited users from your organization can join this channel'
    },
    {
        name: 'External',
        value: 'external',
        description: 'Invited users from any organization can join this channel'
    }
];

const teamsField: INodeProperties = {
    displayName: 'Team Names or IDs',
    description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    name: 'teams',
    type: 'multiOptions',
    placeholder: "Select your teams",
    options: [],
    default: [],
    typeOptions: {
        loadOptionsMethod: 'getTeamsWithoutCustom',
    },
};

const channelDescriptionField: INodeProperties = {
    displayName: 'Channel Description',
    name: 'channelDescription',
    type: 'string',
    default: '',
    placeholder: 'Enter a description for the channel',
};

const visibilityField: INodeProperties = {
    displayName: 'Visibility',
    name: 'visibility',
    type: 'boolean',
    default: false,
    description: 'Whether the channel is visible to everyone in the organization or team',
};

export const channelFields: INodeProperties[] = [
    {
        displayName: 'Channel Name or ID',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        name: 'channel',
        type: 'options',
        required: true,
        placeholder: "Select a channel",
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ["Channel"],
                operation: ['Channel', 'ChannelAsBot', "addUsersToChannel", 'removeChannelMember', 'archiveChannel', 'deleteChannel', 'fetchChannel', 'unarchiveChannel', 'updateChannel'],
            },
        },
        options: [], // Placeholder for dynamically fetched channels
        default: '',
        typeOptions: {
            loadOptionsMethod: 'getChannels',
        },
    },
    {
        displayName: 'Channel Name or ID',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
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
                operation: ['Channel', "ChannelAsBot", 'addUsersToChannel', 'removeChannelMember', 'archiveChannel', 'deleteChannel', 'fetchChannel', 'unarchiveChannel', 'updateChannel'],
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
                operation: ['createChannel'],
            },
        },
        default: '',
        placeholder: 'Enter the channel name',
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
                operation: ['createChannel'],
            },
        },
        options: channelTypeOptions,
        default: 'private',
    },
    {
        ...teamsField,
        required: true,
        displayOptions: {
            show: {
                resource: ['Channel'],
                operation: ['createChannel'],
                level: ['team'],
            },
        },
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        displayOptions: {
            show: {
                resource: ['Channel'],
                operation: ['createChannel'],
            },
        },
        default: {},
        options: [
            channelDescriptionField,
            {
                displayName: 'Email Address',
                name: 'channelEmailIDs',
                placeholder: "Enter the email address of the user",
                type: 'string',
                displayOptions: {
                    show: {
                        '/level': ['private', 'external', 'organization'],
                    },
                },
                default: '',
                description: 'Enter the email addresses of users to be added to the channel. Separate multiple email addresses with commas.',
            },
            {
                ...visibilityField,
                displayOptions: {
                    show: {
                        '/level': ['organization', 'team'],
                    },
                },
            },
        ],
    },
    {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        displayOptions: {
            show: {
                resource: ['Channel'],
                operation: ['updateChannel'],
            },
        },
        default: {},
        options: [
            channelDescriptionField,
            {
                displayName: 'Channel Name',
                name: 'channelName',
                type: 'string',
                default: '',
                placeholder: 'Enter the channel name',
            },
            {
                displayName: 'Channel Type',
                name: 'level',
                type: 'options',
                options: channelTypeOptions,
                default: 'private',
            },
            {
                ...teamsField,
                displayOptions: {
                    show: {
                        level: ['team'],
                    },
                },
            },
            {
                ...visibilityField,
                displayOptions: {
                    show: {
                        level: ['organization', 'team'],
                    },
                },
            },
        ],
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