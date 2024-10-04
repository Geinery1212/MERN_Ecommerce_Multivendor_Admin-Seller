import authReducer from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer";
import chatSellerReducer from "./Reducers/chat/chatSellerReducer";
import productReducer from "./Reducers/productReducer";
import sellerReducer from "./Reducers/sellerReducer";

const rootReducer = {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    seller: sellerReducer,
    chatSellerReducer: chatSellerReducer
}
export default rootReducer;