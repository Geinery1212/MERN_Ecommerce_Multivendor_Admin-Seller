import authReducer from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer";
import chatAdminToSellerReducer from "./Reducers/chat/chatAdminToSellerReducer";
import chatSellerReducer from "./Reducers/chat/chatSellerReducer";
import chatSellerToAdminReducer from "./Reducers/chat/chatSellerToAdminReducer";
import ordersReducer from "./Reducers/ordersReducer";
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
    ordersReducer: ordersReducer
}
export default rootReducer;