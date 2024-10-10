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
const PaymentRequest = lazy(() => import("../../views/admin/PaymentRequest"));
const DeactiveSellers = lazy(() => import("../../views/admin/DeactiveSellers"));
const SellerRequest = lazy(() => import("../../views/admin/SellerRequest"));
const SellerDetails = lazy(() => import("../../views/admin/SellerDetails"));
const ChatSeller = lazy(() => import("../../views/admin/ChatSeller"));
const OrderDetails = lazy(() => import("../../views/admin/OrderDetails"));

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
        path: '/admin/dashboard/orders/details/:orderId',
        element: <OrderDetails />,
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
    },
    {
        path: '/admin/dashboard/payment-request',
        element: <PaymentRequest />,
        //roles the will be able to access the home
        role: 'admin'
    },
    {
        path: '/admin/dashboard/deactive-sellers',
        element: <DeactiveSellers />,
        //roles the will be able to access the home
        role: 'admin'
    },
    {
        path: '/admin/dashboard/sellers-request',
        element: <SellerRequest />,
        //roles the will be able to access the home
        role: 'admin'
    },
    {
        path: '/admin/dashboard/seller/details/:sellerId',
        element: <SellerDetails />,
        //roles the will be able to access the home
        role: 'admin'
    },
    {
        path: '/admin/dashboard/chat-seller',
        element: <ChatSeller />,
        //roles the will be able to access the home
        role: 'admin'
    },
    {
        path: '/admin/dashboard/chat-seller/:sellerId',
        element: <ChatSeller />,
        //roles the will be able to access the home
        role: 'admin'
    }
]