//add your okta configuration
export const oktaConfig ={
    clientId: '',
    issuer: '',
    redirectUri: 'https://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true
}