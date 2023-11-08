import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import AuthRouter from './routes/AuthRouter';
import ProtectedRoutes from './routes/Protected';
import { ConfigProvider } from 'antd';

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
	const token = 'Token';

	return (
		<ConfigProvider direction='ltr'>
			<div className='w-full xs:w-[400px]'>
				<RouterProvider router={token ? protectedRoutes : authRoutes} />
			</div>
		</ConfigProvider>
	);
}
