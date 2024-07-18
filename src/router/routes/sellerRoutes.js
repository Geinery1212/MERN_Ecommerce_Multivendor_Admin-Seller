import { lazy } from "react";
import Orders from "../../views/seller/Orders";
// Import this way to load them only when necessary
/**
 * Make sure components are exported as default components
 * Sixtax: export default ComponentName
 */
const Home = lazy(() => import("../../views/auth/pages/Home"));
const SellerDashboard = lazy(() => import("../../views/seller/SellerDashboard"));
const AddProduct = lazy(() => import("../../views/seller/AddProduct"));
const Products = lazy(() => import("../../views/seller/Products"));
const DiscountProducts = lazy(() => import("../../views/seller/DiscountProducts"));

export const sellerRoutes = [
    {
        path: '/',
        element: <Home />,
        //roles the will be able to access the home
        ability: ['admin', 'seller']
    },
    {
        path: '/seller/dashboard',
        element: <SellerDashboard />,
        //roles the will be able to access the home
        ability: ['seller']
    },
    {
        path: '/seller/dashboard/add-product',
        element: <AddProduct />,
        //roles the will be able to access the home
        ability: ['seller']
    },
    {
        path: '/seller/dashboard/all-products',
        element: <Products />,
        //roles the will be able to access the home
        ability: ['seller']
    },
    {
        path: '/seller/dashboard/discount-products',
        element: <DiscountProducts />,
        //roles the will be able to access the home
        ability: ['seller']
    },
    {
        path: '/seller/dashboard/orders',
        element: <Orders />,
        //roles the will be able to access the home
        ability: ['seller']
    }
]