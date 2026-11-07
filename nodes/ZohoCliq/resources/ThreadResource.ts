import type { INodeProperties } from "n8n-workflow";
import { messageAdditionalFields } from './MessageResource';

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
                name: 'Create',
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

const threadOnlyFields: INodeProperties[] = [
    {
        displayName: 'Post in Parent Channel',
        name: 'postInChannel',
        type: 'boolean',
        default: false,
        description: 'Whether to post the message in the parent channel along with this thread',
    },
    {
        displayName: 'Thread Title',
        name: 'threadTitle',
        type: 'string',
        default: '',
        placeholder: 'Enter the thread title',
    },
];

const threadAdditionalFields = [...messageAdditionalFields, ...threadOnlyFields]
    .sort((a, b) => a.displayName.localeCompare(b.displayName));

export const threadFields: INodeProperties[] = [
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
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        displayOptions: {
            show: {
                resource: ['Thread'],
                operation: ['Thread'],
            },
        },
        default: {},
        options: threadAdditionalFields,
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