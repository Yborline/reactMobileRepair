export const getUserName = (state) => state.auth.user;

export const getLoggedIn = (state) => state.auth.isLoggedIn;
export const getUser = (state) => state.auth.user;
export const getUserError = (state) => state.auth.userError;
export const getUserLoading = (state) => state.auth.userLoading;
export const getIsFetchingCurrent = (state) => state.auth.isFetchingCurrentUser;
