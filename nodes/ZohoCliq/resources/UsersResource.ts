import type { INodeProperties } from "n8n-workflow";

export const userOperations: INodeProperties[] = [

    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: [
                    'Users',
                ],
            },
        },
        options: [
            {
                name: 'Add User Status',
                value: 'addUserStatus',
                action: 'Add user status',
                description: 'Add status for a user',
            },
            {
                name: 'Retrieve User Data',
                value: 'retrieveUser',
                action: 'Retrieve user data',
                description: 'Retrieve details of a specific user',
            },
            {
                name: "Set User Status",
                value: 'setUserStatus',
                action: 'Set user status',
                description: 'Set status for a user',
            },
        ],
        default: 'retrieveUser',
    },
]

export const userFields: INodeProperties[] = [
    {
        displayName: "Email ID/ ZUID",
        name: 'emailIDorZUID',
        type: 'string',
        placeholder: "scott.fisher@zylker.com/55743307",
        required: true,
        displayOptions: {
            show: {
                resource: ['Users'],
                operation: ['retrieveUser'],
            },
        },
        default: '',
    },
    {
        displayName: 'Status',
        name: 'statusCode',
        type: 'options',
        placeholder: "Select a user's availability status",
        required: true,
        displayOptions: {
            show: {
                resource: ['Users'],
                operation: ['addUserStatus'],
            },
        },
        options: [
            {
                name: 'Available',
                value: 'available',
            },
            {
                name: 'Busy',
                value: 'busy',
            },
            {
                name: 'Away',
                value: 'away',
            },
            {
                name: 'Invisible',
                value: 'invisible',
            }
        ],
        default: 'available',
        description: 'Select the status that represents the user\'s availability',
    },
    {
        displayName: 'Status Message',
        name: 'statusMessage',
        required: true,
        type: 'string',
        displayOptions: {
            show: {
                resource: ['Users'],
                operation: ['addUserStatus'],
            },
        },
        default: '',
        placeholder: 'Enter a custom status message',
        description: 'Enter a custom message to give more context about the user’s status',
    },

    // Set a user status
    {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        placeholder: "Select a user's availability status",
        required: true,
        displayOptions: {
            show: {
                resource: ['Users'],
                operation: ['setUserStatus'],
            },
        },
        options: [],
        default: '',
        typeOptions: {
            loadOptionsMethod: 'getUserStatuses',
        },
    },

]