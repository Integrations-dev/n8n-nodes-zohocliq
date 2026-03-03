"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZohoCliqOAuth2Api = void 0;
class ZohoCliqOAuth2Api {
    constructor() {
        this.name = 'zohoCliqOAuth2Api';
        this.extends = ['oAuth2Api'];
        this.displayName = 'Zoho Cliq OAuth2 API';
        this.icon = 'file:cliq.svg';
        this.documentationUrl = 'https://www.zoho.com/cliq/help/platform/n8n-integration-zoho-cliq.html';
        this.properties = [
            {
                displayName: 'Grant Type',
                name: 'grantType',
                type: 'hidden',
                default: 'authorizationCode',
            },
            {
                displayName: 'Data Centre',
                name: 'authUrl',
                type: 'options',
                options: [
                    {
                        name: 'US',
                        value: 'https://accounts.zoho.com/oauth/v2/auth'
                    },
                    {
                        name: 'IN',
                        value: 'https://accounts.zoho.in/oauth/v2/auth'
                    },
                    {
                        name: 'AU',
                        value: 'https://accounts.zoho.com.au/oauth/v2/auth'
                    },
                    {
                        name: 'CN',
                        value: 'https://accounts.zoho.com.cn/oauth/v2/auth'
                    },
                    {
                        name: 'EU',
                        value: 'https://accounts.zoho.eu/oauth/v2/auth'
                    },
                    {
                        name: 'CA',
                        value: 'https://accounts.zohocloud.ca/oauth/v2/auth'
                    },
                    {
                        name: 'SA',
                        value: 'https://accounts.zoho.sa/oauth/v2/auth'
                    },
                    {
                        name: 'JP',
                        value: 'https://accounts.zoho.jp/oauth/v2/auth',
                    }
                ],
                default: 'https://accounts.zoho.com/oauth/v2/auth',
                required: true,
            },
            {
                displayName: 'Access Token URL',
                name: 'accessTokenUrl',
                type: 'hidden',
                default: '={{ $self.authUrl.replace(\'/auth\', \'/token\') }}',
                required: true,
            },
            {
                displayName: 'Client ID',
                name: 'clientId',
                type: 'string',
                default: '',
                required: true,
            },
            {
                displayName: 'Client Secret',
                name: 'clientSecret',
                type: 'string',
                default: '',
                required: true,
                typeOptions: {
                    password: true
                }
            },
            {
                displayName: 'Scope',
                name: 'scope',
                type: 'hidden',
                default: 'ZohoCliq.webhooks.CREATE,ZohoCliq.channels.READ,ZohoCliq.Channels.UPDATE,ZohoCliq.Channels.DELETE,ZohoCliq.Users.READ,ZohoPeople.employee.READ,ZohoPeople.forms.READ,ZohoPeople.attendance.READ,ZohoCliq.Chats.READ,ZohoCliq.Chats.UPDATE,ZohoCliq.Profile.READ,ZohoCliq.Profile.CREATE,ZohoCliq.Profile.UPDATE,ZohoCliq.Teams.READ,ZohoCliq.Chats.CREATE,ZohoCliq.Channels.CREATE',
            },
            {
                displayName: 'Auth URI Query Parameters',
                name: 'authQueryParameters',
                type: 'hidden',
                default: 'access_type=offline&prompt=consent',
            },
            {
                displayName: 'Authentication',
                name: 'authentication',
                type: 'hidden',
                default: 'body',
            },
        ];
    }
}
exports.ZohoCliqOAuth2Api = ZohoCliqOAuth2Api;
//# sourceMappingURL=ZohoCliqOAuth2Api.credentials.js.map