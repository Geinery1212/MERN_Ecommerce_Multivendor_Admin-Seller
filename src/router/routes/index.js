import Main from "../../layout/Main";
import { privateRoutes } from "./privateRoutes";

export const getRoutes = ()=>{
    return {
        path: '/',
        element: <Main/>,
        children: privateRoutes
    }
}