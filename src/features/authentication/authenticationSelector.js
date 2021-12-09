const getAuth = ({ auth }) => auth;
const getTokens = ({ auth }) => {
    const { jwt, publicJwt } = auth;

    return { jwt, publicJwt };
};
const getJwt = ({ auth }) => auth.jwt;
const getPublicJwt = ({ auth }) => auth.publicJwt;
const isLoggedIn = ({ auth }) => !!auth.jwt && !!auth.login;
const isExternalSourceLoggedIn =
    (category) =>
    ({ auth }) =>
        auth[category] && !!auth[category].login;
const hasAuthenticationError = ({ auth }) => !!auth?.error?.length || false;

export { getAuth, getTokens, isLoggedIn, getJwt, getPublicJwt, isExternalSourceLoggedIn, hasAuthenticationError };
