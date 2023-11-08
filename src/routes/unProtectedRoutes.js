import Login from '../views/auth/Login';
import Verification from "../views/auth/Verification";
import Register from "../views/auth/Register";
import ForgotPassword from "../views/auth/ForgotPassword";
import Home from "../views/home";
import UserInfo from "../views/information/UserInfo";
import HealthInfo from "../views/information/HealthInfo";
import Result from "../views/result/Result";
import HealthInfoResult from "../views/result/HealthInfoResult";

const authRoutes = [
    { path: '/', element: Login } ,
    { path:'/verification' , element: Verification},
    { path: '/register' , element : Register},
    { path: '/forgot-password' , element : ForgotPassword},
    { path: '/home' , element : Home},
    { path: '/user-info' , element : UserInfo},
    { path: '/health-info' , element : HealthInfo},
    { path: '/result' , element: Result},
    { path: '/health-info-result' , element: HealthInfoResult}

];

export default authRoutes;
