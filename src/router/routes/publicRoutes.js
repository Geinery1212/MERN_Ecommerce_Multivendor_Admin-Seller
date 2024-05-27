import { lazy } from "react";
const LOGIN = lazy(()=>import("../../views/auth/Login"));
const REGISTER = lazy(()=>import("../../views/auth/Register"));

const publicRoutes = [
    {
        path: '/login',
        element: <LOGIN/>
    },
    {
        path: '/register',
        element: <REGISTER/>
    }
];
export default publicRoutes;