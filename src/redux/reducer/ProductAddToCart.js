// import { createSlice } from "@reduxjs/toolkit";

// export const productAddToCart = createSlice({
//     name: 'productInCart',
//     initialState: {
//         productName: "",
//         price: '',
//         size: "",
//         counter: ""
//     },
//     reducers: {
//         productInCart: (state, action) => {
//             console.log(state)
//             console.log(action)
//         }
//     }
// }) 

// export const {productInCart} = productAddToCart.actions

// export default productAddToCart.reducer




import { createSlice } from "@reduxjs/toolkit";

export const productAddToCart = createSlice({
    name: 'productInCart',
    initialState: {
        cartProducts: []
    },
    reducers: {
        addProductToCart: (state, action) => {
            
            const { productName, price, size, counter, id, image, subText } = action.payload;
            const newProductAddedToCart = { productName, price, size, counter, id, image, subText }

            const existId = state.cartProducts?.find((item) => item?.id == id)
            if (!existId) {
                state.cartProducts.push(newProductAddedToCart)
            } else {
                existId.counter = counter
                existId.size = size
                existId.image = image
                // existId.price = price * counter

            }
        },
        incrementCounter: (state, action) => {
            const product = state.cartProducts.find((item) => item.id === action.payload);
            if (product) {
                product.counter += 1;
            }
        },
        decrementCounter: (state, action) => {
            const product = state.cartProducts.find((item) => item.id === action.payload);
            if (product && product.counter > 1) {
                product.counter -= 1;
            }
        },
        deleteProduct :(state,action)=>{
            state.cartProducts= state.cartProducts.filter((item,index)=>item?.id != action.payload)
        },
        clearCart: (state) => {
            state.cartProducts = [];
        }

    }
});

export const { addProductToCart, incrementCounter, decrementCounter ,deleteProduct,clearCart} = productAddToCart.actions;

export default productAddToCart.reducer;
