import { FaBorderAll, FaShoppingCart, FaUser, FaUserTimes } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { FaCodePullRequest } from "react-icons/fa6";
import { IoIosChatbubbles } from "react-icons/io";
import { RiDiscountPercentFill } from "react-icons/ri";
import { ImProfile } from "react-icons/im";
import { MdPayments } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { TbMessageCircle2Filled } from "react-icons/tb";

export const allNav = [
    {
        id: 1,
        title: 'Dashboard',
        icon: <MdDashboard />,
        role: 'admin',
        path: '/admin/dashboard'
    },
    {
        id: 2,
        title: 'Orders',
        icon: <FaShoppingCart />,
        role: 'admin',
        path: '/admin/dashboard/orders'
    },
    {
        id: 3,
        title: 'Category',
        icon: <FaBorderAll />,
        role: 'admin',
        path: '/admin/dashboard/category'
    },
    {
        id: 4,
        title: 'Sellers',
        icon: <FaUser />,
        role: 'admin',
        path: '/admin/dashboard/sellers'
    }, {
        id: 5,
        title: 'Payment Request',
        icon: <MdPayments  />,
        role: 'admin',
        path: '/admin/dashboard/payment-request'
    },
    {
        id: 6,
        title: 'Deactive Sellers',
        icon: <FaUserTimes />,
        role: 'admin',
        path: '/admin/dashboard/deactive-sellers'
    },
    {
        id: 7,
        title: 'Seller Request',
        icon: <FaCodePullRequest />,
        role: 'admin',
        path: '/admin/dashboard/sellers-request'
    },
    {
        id: 8,
        title: 'Live Chat',
        icon: <IoIosChatbubbles />
        ,
        role: 'admin',
        path: '/admin/dashboard/chat-seller'
    },
    {
        id: 9,
        title: 'Dashboard',
        icon: <MdDashboard />,
        role: 'seller',
        path: '/seller/dashboard'
    },
    {
        id: 10,
        title: 'Add Product',
        icon: <MdAddCircle />,
        role: 'seller',
        path: '/seller/dashboard/add-product'
    },
    {
        id: 11,
        title: 'All Products',
        icon: <FaBorderAll />,
        role: 'seller',
        path: '/seller/dashboard/all-products'
    },
    {
        id: 12,
        title: 'Discount Product',
        icon: <RiDiscountPercentFill   />,
        role: 'seller',
        path: '/seller/dashboard/discount-products'
    },
    {
        id: 13,
        title: 'Orders',
        icon: <FaShoppingCart />,
        role: 'seller',
        path: '/seller/dashboard/orders'
    },
    {
        id: 14,
        title: 'Payments',
        icon: <MdPayments/>,
        role: 'seller',
        path: '/seller/dashboard/payments'
    },
    {
        id: 15,
        title: 'Chat-Customer',
        icon: <IoIosChatbubbles />,
        role: 'seller',
        path: '/seller/dashboard/chat-customer'
    },
    {
        id: 16,
        title: 'Chat-Support',
        icon: <TbMessageCircle2Filled />,
        role: 'seller',
        path: '/seller/dashboard/chat-support'
    },
    {
        id: 17,
        title: 'Profile',
        icon: <ImProfile />,
        role: 'seller',
        path: '/seller/dashboard/profile'
    },
];