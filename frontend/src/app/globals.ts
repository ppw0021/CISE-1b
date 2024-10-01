let authTokenGlobal = "";
let isAdminGlobal = false;

export const setGlobals = (setAuthTokenGlobal: string, setAdminGlobal: boolean) => {
    authTokenGlobal = setAuthTokenGlobal;
    isAdminGlobal = setAdminGlobal;
}

export const getGlobals = () => ({
    authTokenGlobal,
    isAdminGlobal
})