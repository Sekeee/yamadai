import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Loading from './components/common/Loading';
import ProtectedRoutes from './routes/Protected';
import AuthRouter from './routes/AuthRouter';
import { ConfigProvider } from 'antd';
import useStore from './store';
import './config/interceptor';

const authRoutes = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path={'*'}
			element={<AuthRouter />}
		/>
	)
);

const protectedRoutes = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path={'*'}
			element={<ProtectedRoutes />}
		/>
	)
);

export default function App() {
	const token = useStore(state => state.auth.token);
	const loading = useStore(state => state.loading);

	return (
		<ConfigProvider theme={{ token: { colorPrimary: '#11a9a4' } }}>
			{loading && <Loading />}
			<div className='w-full bg-white overflow-hidden pb-4 sm:w-[400px]'>
				<RouterProvider router={token ? protectedRoutes : authRoutes} />
			</div>
		</ConfigProvider>
	);
}
