import Login from '../views/auth/Login';
import Verification from "../views/auth/Verification";
import Register from "../views/auth/Register";
import ForgotPassword from "../views/auth/ForgotPassword";
import Home from "../views/home";

const authRoutes = [
    { path: '/', element: Login } ,
    { path:'/verification' , element: Verification},
    { path: '/register' , element : Register},
    { path: '/forgot-password' , element : ForgotPassword},
    { path: '/home' , element : Home},
];

export default authRoutes;
