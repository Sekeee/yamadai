import { Routes, Route } from "react-router-dom";
import routes from './protectedRoutes';

const getRoutes = () => {
    const array = [];
    const routeKeys = [];
    for (const route of routes) {
        if (routeKeys.includes(route.key)) {
            console.error(`Duplicate Route Key: ${route.key}`);
        }

        routeKeys.push(route.key);
        if (route.element) {
            array.push(
                <Route key={route.path} path={route.path} element={<route.element />} />
            )
        }
    }
    return array;
}

const ProtectedRoutes = () => {
    return (
        <Routes>
            {getRoutes()}
        </Routes>
    )
};

export default ProtectedRoutes;
