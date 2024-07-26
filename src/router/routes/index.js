import Main from "../../layout/Main";
import { privateRoutes } from "./privateRoutes";
import ProtectRoute from "./ProtectRoute";

export const getRoutes = () => {
    privateRoutes.map(r => {
        r.element = <ProtectRoute route={r}>
            {r.element}</ProtectRoute>
    });
    return {
        path: '/',
        element: <Main />,
        children: privateRoutes
    }
}