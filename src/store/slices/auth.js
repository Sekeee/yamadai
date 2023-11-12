export const createAuthSlice = (set, get) => {
	return {
		auth: {
			token: null,
			refreshToken: null,
			setLoginInfo: (token, refreshToken) => {
				set(state => {
					state.auth.token = token;
					state.auth.refreshToken = refreshToken;
				});
			},
		},
	};
};
