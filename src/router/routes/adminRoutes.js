import { lazy } from "react";
// Import this way to load them only when necessary
/**
 * Make sure components are exported as default components
 * Sixtax: export default ComponentName
 */

const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard"));
const Orders = lazy(() => import("../../views/admin/Orders"));
const Category = lazy(() => import("../../views/admin/Category"));
const Sellers = lazy(() => import("../../views/admin/Sellers"));

export const adminRoutes = [
    {
        path: '/admin/dashboard',
        element: <AdminDashboard />,
        //roles the will be able to access the home
        role: 'admin'
    },
    {
        path: '/admin/dashboard/orders',
        element: <Orders />,
        //roles the will be able to access the home
        role: 'admin'
    },
    {
        path: '/admin/dashboard/category',
        element: <Category />,
        //roles the will be able to access the home
        role: 'admin'
    },
    {
        path: '/admin/dashboard/sellers',
        element: <Sellers />,
        //roles the will be able to access the home
        role: 'admin'
    }
]