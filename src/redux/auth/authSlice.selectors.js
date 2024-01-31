export const selectAuthToken = state => state.auth.token;
export const selectUserData = state => state.auth.userData;
export const selectIsLoggedIn = state => state.auth.isLogedIn;
export const selectError = state => state.auth.error;
export const selectIsLoading = state => state.auth.isLoading;