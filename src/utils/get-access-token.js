const getAccessToken = (accessToken) => accessToken.split('Bearer ')[1];

export default getAccessToken;
