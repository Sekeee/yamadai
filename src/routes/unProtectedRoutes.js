import Login from '../views/auth/Login';
import Verification from "../views/auth/Verification";
import Register from "../views/auth/Register";

const authRoutes = [
    { path: '/', element: Login } ,
    { path:'/verification' , element: Verification},
    { path: '/register' , element : Register}
];

export default authRoutes;
