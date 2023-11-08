import Home from '../views/home';
import UserInfo from '../views/information/UserInfo';
import HealthInfo from '../views/information/HealthInfo';

const routes = [
	{ key: 'home', path: '/', element: Home },
	{ key: 'user-info', path: '/user-info', element: UserInfo },
	{ key: 'health-info', path: '/health-info', element: HealthInfo },
];

export default routes;
