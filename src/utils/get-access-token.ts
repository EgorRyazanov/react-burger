const getAccessToken = (accessToken: string): string =>
    accessToken.split('Bearer ')[1];

export default getAccessToken;
