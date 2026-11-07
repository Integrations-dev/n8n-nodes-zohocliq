import type { INodeProperties } from "n8n-workflow";

export const messageOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: [
                    'Message',
                ],
            },
        },
        options: [
            {
                name: 'Channel',
                value: 'Channel',
                action: 'Post message to channel',
                description: 'Send message to a channel',
            },
            {
                name: 'Channel as Bot',
                value: 'ChannelAsBot',
                action: 'Post message to channel as bot',
                description: 'Send message to a channel as a bot',
            },
            {
                name: 'Chat',
                value: 'Chat',
                action: 'Post message to chat',
                description: 'Send message to a chat',
            },
            {
                name: 'Pin',
                value: 'pinMessage',
                action: 'Pin message',
                description: 'Pin a message in a channel',
            },
            {
                name: 'User Chat',
                value: 'DM',
                action: 'Post message to user chat',
                description: 'Send message to a user chat',
            }
        ],
        default: 'Channel',
    },
]

const CARD_THEMES = ['basic', 'modern-inline', 'poll', 'prompt'];

// Optional fields shared by every operation that sends a message (also used by Thread → Create)
export const messageAdditionalFields: INodeProperties[] = [
    {
        displayName: 'Bot Icon URL',
        name: 'botIconURL',
        type: 'string',
        default: '',
        placeholder: 'Enter bot icon image URL',
    },
    {
        displayName: 'Bot Name',
        name: 'botName',
        type: 'string',
        default: '',
        placeholder: 'Enter bot name',
    },
    {
        displayName: 'Card Icon URL',
        name: 'cardIconURL',
        type: 'string',
        displayOptions: {
            show: {
                cardTheme: CARD_THEMES,
            },
        },
        default: '',
        placeholder: 'Enter icon image URL',
    },
    {
        displayName: 'Card Theme',
        name: 'cardTheme',
        type: 'options',
        options: [
            {
                name: 'Basic',
                value: 'basic',
            },
            {
                name: 'Modern Inline',
                value: 'modern-inline',
            },
            {
                name: 'Poll',
                value: 'poll',
            },
            {
                name: 'Prompt',
                value: 'prompt',
            }
        ],
        default: 'basic',
        description: 'Send the message as a card with this theme. If not set, a plain text message is sent.',
    },
    {
        displayName: 'Card Thumbnail URL',
        name: 'cardThumbnailURL',
        type: 'string',
        displayOptions: {
            show: {
                cardTheme: CARD_THEMES,
            },
        },
        default: '',
        placeholder: 'Enter thumbnail image URL',
    },
    {
        displayName: 'Card Title',
        name: 'cardTitle',
        type: 'string',
        displayOptions: {
            show: {
                cardTheme: CARD_THEMES,
            },
        },
        default: '',
        placeholder: 'Enter card title',
    },
    {
        displayName: 'Sync Message',
        name: 'sync',
        type: 'boolean',
        default: false,
        description: 'Whether to return the message ID in the response',
    },
]

export const messageFields: INodeProperties[] = [
    {
        displayName: 'Channel Name or ID',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        name: 'channel',
        type: 'options',
        required: true,
        noDataExpression: true,
        placeholder: "Select a channel",
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['Channel', 'ChannelAsBot'],
            },
        },
        options: [], // Placeholder for dynamically fetched channels
        default: '',
        typeOptions: {
            loadOptionsMethod: 'getChannels',
        },
    },
    {
        displayName: 'Channel ID',
        name: 'customChannelId',
        type: 'string',
        required: true,
        placeholder: "Enter the channel ID",
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['Channel', 'ChannelAsBot'],
                channel: ["Custom_Channel_Selected"]
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
                resource: ['Message'],
                operation: ['ChannelAsBot'],
            },
        },
        default: '',
        placeholder: 'Enter the bot\'s unique name',
        description: 'Send a message in a channel as a bot. The bot must already be a participant in the channel. You can find the bot’s unique name in the bot’s API endpoint URL.',
    },
    {
        displayName: 'User Name or ID',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        name: 'user',
        type: 'options',
        noDataExpression: true,
        required: true,
        placeholder: "Select a user",
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['DM'],
            },
        },
        options: [], // Placeholder for dynamically fetched users
        default: '',
        typeOptions: {
            loadOptionsMethod: 'getUsers',
        },
    },
    {
        displayName: "Email ID/ ZUID",
        name: 'customUserId',
        type: 'string',
        required: true,
        placeholder: "scott.fisher@zylker.com/55743307",
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['DM'],
                user: ['Custom_User_Selected'],
            },
        },
        default: '',
    },
    {
        displayName: 'Chat Name or ID',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        name: 'chat',
        type: 'options',
        required: true,
        placeholder: "Select a chat",
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['Chat', 'pinMessage'],
            },
        },
        options: [], // Placeholder for dynamically fetched chats
        default: '',
        typeOptions: {
            loadOptionsMethod: 'getChats',
        },
    },
    {
        displayName: "Chat ID",
        name: 'customChatId',
        required: true,
        type: 'string',
        placeholder: "Enter the chat ID",
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['Chat', 'pinMessage'],
                chat: ["Custom_Chat_Selected"]
            },
        },
        default: '',
    },
    {
        displayName: 'Message ID',
        name: 'messageId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['pinMessage'],
            },
        },
        default: '',
        placeholder: 'Enter the message ID',
    },
    {
        displayName: 'Text',
        name: 'text',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['Channel', 'ChannelAsBot', 'Chat', 'DM'],
            },
        },
        default: '',
        placeholder: 'Write your message here',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['Channel', 'ChannelAsBot', 'Chat', 'DM'],
            },
        },
        default: {},
        options: messageAdditionalFields,
    },

    // Pin message
    {
        displayName: 'Expiry Time',
        name: 'expiryTime',
        type: 'options',
        placeholder: "Select a expiry time",
        required: true,
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['pinMessage'],
            },
        },
        options: [
            {
                name: '1 Day',
                value: 86400000,
            },
            {
                name: '1 Hour',
                value: 3600000,
            },
            {
                name: '1 Week',
                value: 604800000,
            },
            {
                name: '12 Hours',
                value: 43200000,
            },
            {
                name: '2 Hours',
                value: 7200000,
            },
            {
                name: '4 Hours',
                value: 14400000,
            },
            {
                name: '8 Hours',
                value: 28800000,
            },
            {
                name: 'Custom',
                value: 'custom',
            },
            {
                name: 'Forever',
                value: "-1",
            }
        ],
        default: "-1",
    },
    {
        displayName: 'Expiry Time in Milliseconds',
        name: 'time',
        type: 'string',
        required: true,
        placeholder: "Enter the expiry time",
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['pinMessage'],
                expiryTime: ['custom']
            },
        },
        default: '',
    },
    {
        displayName: 'Notify Members',
        name: 'notify',
        type: 'boolean',
        required: true,
        displayOptions: {
            show: {
                resource: ['Message'],
                operation: ['pinMessage'],
            },
        },
        default: false,
    },
]