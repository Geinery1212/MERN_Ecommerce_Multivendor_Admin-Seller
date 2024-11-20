import authReducer from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer";
import chatAdminToSellerReducer from "./Reducers/chat/chatAdminToSellerReducer";
import chatSellerReducer from "./Reducers/chat/chatSellerReducer";
import chatSellerToAdminReducer from "./Reducers/chat/chatSellerToAdminReducer";
import dashboardReducer from "./Reducers/dashboardReducer";
import ordersReducer from "./Reducers/ordersReducer";
import paymentReducer from "./Reducers/paymentReducer";
import productReducer from "./Reducers/productReducer";
import sellerReducer from "./Reducers/sellerReducer";

const rootReducer = {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    seller: sellerReducer,
    chatSellerReducer: chatSellerReducer,
    chatAdminToSellerReducer: chatAdminToSellerReducer,
    chatSellerToAdminReducer: chatSellerToAdminReducer,
    ordersReducer: ordersReducer,
    payment: paymentReducer,
    dashboard: dashboardReducer
}
export default rootReducer;