import { config } from '@n8n/node-cli/eslint';

export default [
	...config,
	{
		rules: {
            // File name same as unique name in ZohoCliq.node.ts
            'n8n-nodes-base/node-filename-against-convention' : 'off'
		},
	},
];