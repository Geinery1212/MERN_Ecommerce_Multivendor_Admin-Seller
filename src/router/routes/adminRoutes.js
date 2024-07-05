import { lazy } from "react";
// Import this way to load them only when necessary
/**
 * Make sure components are exported as default components
 * Sixtax: export default ComponentName
 */
const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard"));

export const adminRoutes = [
    {
        path: '/admin/dashboard',
        element: <AdminDashboard />,
        //roles the will be able to access the home
        role: 'admin'
    }
]