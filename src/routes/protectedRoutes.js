import Home from '../views/home';
import UserInfo from '../views/information/UserInfo';

const routes = [
	{ key: 'home', path: '/', element: Home },
	{ key: 'user-info', path: '/user-info', element: UserInfo },
];

export default routes;
