import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlide = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingIndex = state.cartItems.findIndex(
                (item) =>
                    item._id === action.payload._id &&
                    item.size === action.payload.size &&
                    item.color === action.payload.color
            );
            if (existingIndex >= 0) {
                state.cartItems[existingIndex] = {
                    ...state.cartItems[existingIndex],
                    quantity:
                        state.cartItems[existingIndex].quantity +
                        action.payload.quantity,
                };
            } else {
                let tempProductItem = { ...action.payload };
                state.cartItems.push(tempProductItem);
            }
        },

        decreaseCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );
            if (state.cartItems[itemIndex].quantity > 1) {
                state.cartItems[itemIndex].quantity -= 1;
                
            }
        },

        increaseCart: (state, action) => {
            const indexItem = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );
            if (
                state.cartItems[indexItem].quantity <
                state.cartItems[indexItem].stock
            ) {
                state.cartItems[indexItem].quantity += 1;
            } else {
                toast.error("Không thể thêm sản phẩm nữa!", {
                    position: "bottom-left",
                });
            }
        },

        removefromCart: (state, action) => {
            state.cartItems.map((cartItem) => {
                if (cartItem._id === action.payload._id) {
                    const nextCartItems = state.cartItems.filter(
                        (item) => item._id !== cartItem._id
                    );
                    state.cartItems = nextCartItems;
                }
                return state;
            });
        },

        getToTals: (state) => {
            let { total, cartQuantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, quantity } = cartItem;
                    const itemTotal = price * quantity;

                    cartTotal.total += itemTotal;
                    cartTotal.cartQuantity += quantity;

                    return cartTotal;
                },
                {
                    total: 0,
                    cartQuantity: 0,
                }
            );
            total = parseFloat(total.toFixed(2));
            state.cartTotalQuantity = cartQuantity;
            state.cartTotalAmount = total;
        },

        clearCart: (state) => {
            state.cartItems = [];
            // toast.error("Đã xóa toàn bộ giỏ hàng!", {
            //     position: "bottom-left",
            // });
        },
    },
});

export const {
    addToCart,
    decreaseCart,
    increaseCart,
    removefromCart,
    getToTals,
    clearCart,
} = cartSlide.actions;

export const cartReducer = cartSlide.reducer;
