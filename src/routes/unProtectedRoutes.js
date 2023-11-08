import Login from '../views/auth/Login';
import Verification from "../views/auth/Verification";

const authRoutes = [{ path: '/', element: Login } , {path:'verification' , element: Verification}];

export default authRoutes;
