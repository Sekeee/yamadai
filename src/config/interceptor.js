import axios from 'axios';
import message from '../components/common/Message';
import useStore from '../store';
import { APP_BASE_URL } from './index';

const TOASTER_DURATION = 10;

const logout = () => {
	// useStore.setState({ auth: { token: null } });
	// localStorage.clear();
	// window.location.href = '/';
};

axios.interceptors.request.use(config => {
	!config.silent && useStore.setState({ loading: true });
	config.headers = {
		'Content-Type': 'application/json',
		...config.headers,
	};

	if (!config.noAuthorization && !config.headers.Authorization ) {
		const state = useStore.getState();
		if(state?.auth?.token) config.headers.Authorization = `Bearer ${state?.auth?.token}` || undefined;


	}

	if (!config.url.startsWith('http')) {
		config.url = `${APP_BASE_URL}${config.url}`;
	}

	return config;
});

axios.interceptors.response.use(
	res => {
		if (res?.data?.statusCode === 400 || res?.data?.statusCode === 500) {
			let errMessage = 'エラー発生しました';
			if (res?.data?.message_mn) {
				errMessage = res.data.message_mn;
			} else if (res?.data?.message_en) {
				errMessage = res.data.message_en;
			}
			message(errMessage, false, { duration: TOASTER_DURATION });
		}
		if (res?.data?.statusCode === 404) {
			message('エラー発生しました', false, { duration: TOASTER_DURATION });
		}
		useStore.setState({ loading: false });
		return res;
	},
	error => {
		if (error?.response?.status === 401) {
			logout();
		} else if (error?.response?.data?.message_mn) {
			message(error?.response?.data?.message_mn, false, { duration: TOASTER_DURATION });
		} else if (error?.response?.data?.message_en) {
			message(error?.response?.data?.message_en, false, { duration: TOASTER_DURATION });
		} else {
			message('エラー発生しました', false, { duration: TOASTER_DURATION });
		}
		useStore.setState({ loading: false });
		return error;
	}
);
