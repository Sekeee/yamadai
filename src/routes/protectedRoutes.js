import Home from '../views/home';
import UserInfo from '../views/information/UserInfo';
import HealthInfo from '../views/information/HealthInfo';
import PredictResult from '../views/result/PredictResult';

const routes = [
	{ key: 'home', path: '/', element: Home },
	{ key: 'user-info', path: '/user-info', element: UserInfo },
	{ key: 'health-info', path: '/health-info', element: HealthInfo },
	{ key: 'predict-result', path: '/predict-result', element: PredictResult },
];

export default routes;
