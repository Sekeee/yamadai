import Home from '../views/home';
import UserInfo from '../views/information/UserInfo';
import HealthInfo from '../views/information/HealthInfo';
import PredictResult from '../views/result/PredictResult';
import Result from '../views/result/Result';
import HealthEdit from '../views/information/HealthEdit';

import DailyHabit from '../views/daily-habit';
import DailyHistory from '../views/daily-history';
import HistoryEdit from '../views/daily-history/Edit';
import Advice from '../views/advice';
import AdviceDetail from '../views/advice/Detail';
import Notification from '../views/notification';
import DailyResult from '../views/daily-history/Result';

const routes = [
	{ key: 'home', path: '/', element: Home },
	{ key: 'user-info', path: '/user-info', element: UserInfo },
	{ key: 'health-info', path: '/health-info', element: HealthInfo },
	{ key: 'health-edit', path: '/health-edit', element: HealthEdit },
	{ key: 'predict-result', path: '/predict-result', element: PredictResult },
	{ key: 'result', path: '/result', element: Result },

	{ key: 'daily-habit', path: '/daily-habit', element: DailyHabit },
	{ key: 'daily-history', path: '/daily-history', element: DailyHistory },
	{ key: 'daily-result', path: '/daily-result', element: DailyResult },
	{ key: 'history-edit', path: '/history-edit', element: HistoryEdit },
	{ key: 'advice', path: '/advice', element: Advice },
	{ key: 'advice-detail', path: '/advice-detail', element: AdviceDetail },
	{ key: 'notification', path: '/notification', element: Notification },
];

export default routes;
