import type { INodeProperties } from "n8n-workflow";

export const teamOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: [
                    'Team',
                ],
            },
        },
        options: [
            {
                name: 'Fetch Team',
                value: 'fetchTeam',
                action: 'Fetch team',
                description: 'Fetch details of a specific team',
            }
        ],
        default: 'fetchTeam',
    }
]


export const teamFields: INodeProperties[] = [
    {
        displayName: 'Team',
        name: 'team',
        type: 'options',
        noDataExpression: true,
        required: true,
        displayOptions: {
            show: {
                resource: ["Team"],
                operation: ['fetchTeam'],
            },
        },
        options: [], // Placeholder for dynamically fetched teams
        default: '',
        typeOptions: {
            loadOptionsMethod: 'getTeams',
        },
        description: 'Select the team to perform the action on',
        placeholder: "Select a team"
    },
    {
        displayName: 'Team ID',
        name: 'teamId',
        type: 'string',
        required: true,
        placeholder: "Enter a team ID",
        displayOptions: {
            show: {
                resource: ["Team"],
                operation: ['fetchTeam'],
                team: ['Custom_Team_Selected'],
            },
        },
        default: '',
    },

]