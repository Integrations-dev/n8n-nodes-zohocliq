import type { INodeProperties } from "n8n-workflow";

export const threadOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: [
                    'Thread',
                ],
            },
        },
        options: [
            {
                name: 'Create a Thread',
                value: 'Thread',
                action: 'Create a thread',
                description: 'Create a thread in a channel',
            },
            {
                name: 'Update Thread State',
                value: 'updateThreadState',
                action: 'Update thread state',
                description: 'Update the state of a thread (close/ reopen)',
            }
        ],
        default: 'Thread',
    },
]

export const threadFields: INodeProperties[] = [
    {
        displayName: 'Channel',
        name: 'channel',
        type: 'options',
        required: true,
        noDataExpression: true,
        placeholder: "Select a channel",
        displayOptions: {
            show: {
                resource: ['Thread'],
                operation: ['Thread'],
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
                resource: ['Thread'],
                operation: ['Thread'],
                channel: ["Custom_Channel_Selected"]
            },
        },
        default: '',
    },

    //Create Thread
    {
        displayName: 'Message ID',
        name: 'messageId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['Thread'],
                operation: ['Thread'],
            },
        },
        default: '',
        placeholder: 'Enter the message ID',
    },
    {
        displayName: "Thread Title",
        name: 'threadTitle',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['Thread'],
                operation: ['Thread'],
            },
        },
        default: '',
        placeholder: 'Enter the thread title',
    },
    {
        displayName: 'Text',
        name: 'text',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['Thread'],
                operation: ['Thread'],
            },
        },
        default: '',
        placeholder: 'Write your message here',
    },
    {
        displayName: 'Card Theme',
        name: 'cardTheme',
        type: 'options',
        placeholder: "Select card theme",
        displayOptions: {
            show: {
                resource: ['Thread'],
                operation: ['Thread'],
            },
        },
        options: [
            {
                name: 'None',
                value: 'none',
            },
            {
                name: 'Basic',
                value: 'basic',
            },
            {
                name: 'Poll',
                value: 'poll',
            },
            {
                name: 'Modern Inline',
                value: 'modern-inline',
            },
            {
                name: 'Prompt',
                value: 'prompt',
            }
        ],
        default: 'none',
        description: 'Customize your message with a theme. If not specified, a plain text message will be sent.',
    },
    {
        displayName: 'Card Title',
        name: 'cardTitle',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['Thread'],
                operation: ['Thread'],
                cardTheme: ['basic', 'poll', 'modern-inline', 'prompt'],
            },
        },
        default: '',
        placeholder: 'Enter card title',
    },
    {
        displayName: 'Card Thumbnail URL',
        name: 'cardThumbnailURL',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['Thread'],
                operation: ['Thread'],
                cardTheme: ['basic', 'poll', 'modern-inline', 'prompt'],
            },
        },
        placeholder: "Enter thumbnail image URL",
        default: '',
    },
    {
        displayName: 'Card Icon URL',
        name: 'cardIconURL',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['Thread'],
                operation: ['Thread'],
                cardTheme: ['basic', 'poll', 'modern-inline', 'prompt'],
            },
        },
        placeholder: "Enter icon image URL",
        default: '',
    },
    {
        displayName: 'Bot Name',
        name: 'botName',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['Thread'],
                operation: ['Thread'],
            },
        },
        default: '',
        placeholder: 'Enter bot name',
    },
    {
        displayName: 'Bot Icon URL',
        name: 'botIconURL',
        type: 'string',
        placeholder: "Enter bot icon image URL",
        displayOptions: {
            show: {
                resource: ['Thread'],
                operation: ['Thread'],
            },
        },
        default: '',
    },
    {
        displayName: 'Post in Parent Channel',
        name: 'postInChannel',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['Thread'],
                operation: ['Thread'],
            },
        },
        default: false,
        description: 'If enabled, the parent channel will be notified about this thread creation',
    },
    {
        displayName: 'Sync Message',
        name: 'sync',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['Thread'],
                operation: ['Thread'],
            },
        },
        default: false,
        description: 'If enabled, the Message ID will be returned in the response',
    },

    {
        displayName: 'Thread Chat ID',
        name: 'threadChatId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['Thread'],
                operation: ['updateThreadState'],
            },
        },
        default: '',
        placeholder: 'Enter the thread chat ID',
    },
    {
        displayName: 'Thread Status',
        name: 'state',
        type: 'options',
        required: true,
        placeholder: "Select the thread action",
        displayOptions: {
            show: {
                resource: ['Thread'],
                operation: ['updateThreadState'],
            },
        },
        options: [
            {
                name: 'Close',
                value: 'close',
            },
            {
                name: 'Reopen',
                value: 'reopen',
            }
        ],
        default: 'close',
    }
]