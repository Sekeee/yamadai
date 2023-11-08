import Login from '../views/auth/Login';
import Verification from "../views/auth/Verification";
import Register from "../views/auth/Register";
import ForgotPassword from "../views/auth/ForgotPassword";

const authRoutes = [
    { path: '/', element: Login } ,
    { path:'/verification' , element: Verification},
    { path: '/register' , element : Register},
    { path: '/forgot-password' , element : ForgotPassword},
];

export default authRoutes;
