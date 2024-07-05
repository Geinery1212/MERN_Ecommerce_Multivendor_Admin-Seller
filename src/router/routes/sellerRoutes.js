import { lazy } from "react";
// Import this way to load them only when necessary
/**
 * Make sure components are exported as default components
 * Sixtax: export default ComponentName
 */
const Home = lazy(() => import("../../views/auth/pages/Home"));

export const sellerRoutes = [
    {
        path: '/',
        element: <Home />,
        //roles the will be able to access the home
        ability: ['admin', 'seller']
    }
]