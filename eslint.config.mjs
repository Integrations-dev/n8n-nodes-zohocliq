import { config } from '@n8n/node-cli/eslint';

export default [
	...config,
	{
		rules: {

            // Valid 
            'n8n-nodes-base/node-param-description-missing-from-dynamic-multi-options': 'off',
            'n8n-nodes-base/node-param-description-missing-from-dynamic-options': 'off',
            'n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options': 'off',
            'n8n-nodes-base/node-param-description-wrong-for-dynamic-options': 'off',
            'n8n-nodes-base/node-param-description-boolean-without-whether': 'off',
			'n8n-nodes-base/node-param-options-type-unsorted-items': 'off',

            // File name same as unique name in ZohoCliq.node.ts
            'n8n-nodes-base/node-filename-against-convention' : 'off'
		},
	},
];
