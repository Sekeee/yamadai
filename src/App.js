import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import AuthRouter from './routes/AuthRouter';
import ProtectedRoutes from './routes/Protected';
import { ConfigProvider } from 'antd';
import Loading from './components/common/Loading';
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
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#2196F3',
				},
			}}
		>
			{loading && <Loading />}
			<div className='w-full bg-white xs:w-[400px]'>
				<RouterProvider router={token ? protectedRoutes : authRoutes} />
			</div>
		</ConfigProvider>
	);
}
