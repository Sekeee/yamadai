import { MantineProvider } from '@mantine/core';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import AuthRouter from './routes/AuthRouter';
import ProtectedRoutes from './routes/Protected';

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
	const token = '';

	return (
		<MantineProvider>
			<div className='w-full xs:w-[400px]'>
				<RouterProvider router={token ? protectedRoutes : authRoutes} />
			</div>
		</MantineProvider>
	);
}
