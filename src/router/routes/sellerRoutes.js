import { lazy } from "react";
// Import this way to load them only when necessary
/**
 * Make sure components are exported as default components
 * Sixtax: export default ComponentName
*/
const ViewProduct = lazy(() => import("../../views/seller/ViewProduct"));
const SellerDashboard = lazy(() => import("../../views/seller/SellerDashboard"));
const AddProduct = lazy(() => import("../../views/seller/AddProduct"));
const Products = lazy(() => import("../../views/seller/Products"));
const Payments = lazy(() => import("../../views/seller/Payments"));
const DiscountProducts = lazy(() => import("../../views/seller/DiscountProducts"));
const Orders = lazy(() => import("../../views/seller/Orders"));
const SellerToCustomerChat = lazy(() => import("../../views/seller/SellerToCustomerChat"));
const SellerToAdminChat = lazy(() => import("../../views/seller/SellerToAdminChat"));
const Profile = lazy(() => import("../../views/seller/Profile"));
const EditProduct = lazy(() => import("../../views/seller/EditProduct"));
const OrderDetails = lazy(() => import("../../views/seller/OrderDetails"));
const DeactiveAccount = lazy(() => import("../../views/auth/pages/DeactiveAccount"));
const PendingAccount = lazy(() => import("../../views/auth/pages/PendingAccount"));
export const sellerRoutes = [
    {
        path: '/seller/dashboard',
        element: <SellerDashboard />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/add-product',
        element: <AddProduct />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/edit-product/:productId',
        element: <EditProduct />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/view-product/:productId',
        element: <ViewProduct />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/all-products',
        element: <Products />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/discount-products',
        element: <DiscountProducts />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/orders',
        element: <Orders />,
        role: 'seller',
        visibility: ['active', 'deactive']
    },
    {
        path: '/seller/dashboard/order/details/:orderId',
        element: <OrderDetails />,
        role: 'seller',
        visibility: ['active', 'deactive']
    },
    {
        path: '/seller/dashboard/payments',
        element: <Payments />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/chat-customer/:customerId',
        element: <SellerToCustomerChat />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/chat-customer',
        element: <SellerToCustomerChat />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/chat-support',
        element: <SellerToAdminChat />,
        role: 'seller',
        visibility: ['active', 'deactive', 'pending']
    },
    {
        path: '/seller/dashboard/profile',
        element: <Profile />,
        role: 'seller',
        visibility: ['active', 'deactive', 'pending']
    },
    {
        path: '/seller/account-deactive',
        element: <DeactiveAccount />,
        ability: 'seller',
    },
    {
        path: '/seller/account-pending',
        element: <PendingAccount />,
        ability: 'seller',
    },
]