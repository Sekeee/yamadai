export const createLoadingSlice = set => {
	return {
		loading: false,
		setLoading: loading => {
			set(state => {
				state.loading = loading;
			});
		},
	};
};
