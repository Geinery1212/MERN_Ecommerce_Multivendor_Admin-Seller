import { lazy } from "react";
// Import this way to load them only when necessary
/**
 * Make sure components are exported as default components
 * Sixtax: export default ComponentName
 */
const Home = lazy(() => import("../../views/auth/pages/Home"));
const Login = lazy(() => import("../../views/auth/Login"));
const Register = lazy(() => import("../../views/auth/Register"));
const AdminLogin = lazy(() => import("../../views/auth/AdminLogin"));
const UnAuthorized = lazy(() => import("../../views/auth/pages/UnAuthorized"));

const publicRoutes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/unauthorized',
        element: <UnAuthorized />,
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/admin/login',
        element: <AdminLogin />
    }
];
export default publicRoutes;