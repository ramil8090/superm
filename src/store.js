import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addProduct: (state, action) => {
            const existingProduct = state.cart.find(
                (product) => product.id === action.payload.id
            );

            if (existingProduct) {
                // immer makes this immutable, hail immer!
                existingProduct.quantity += 1;
            } else {
                // immer makes this immutable, hail immer!
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        removeProduct: (state, action) => {
            const index = state.cart.findIndex(
                (product) => product.id === action.payload.id
            );
            // immer makes this immutable, hail immer!
            state.cart.splice(index, 1);
        }
    }
});

const loadPersistedStateFromLocalStorage = () => {
    let savedCart = initialState;
    try {
        savedCart = JSON.parse(localStorage.getItem("supermData")) || initialState;
    } catch (error) {
        console.log(error);
    }
    return savedCart;
};

const savePersistedToLocalStorage = (state) => {
    try {
        localStorage.setItem("supermData", JSON.stringify(state));
    } catch (error) {
        console.log(error);
    }
};

const store = configureStore({
    reducer: cartSlice.reducer,
    preloadedState: loadPersistedStateFromLocalStorage(),
});

store.subscribe(() => savePersistedToLocalStorage(store.getState()));

const { addProduct, removeProduct } = cartSlice.actions;

const cartCountSelector = (state) => {
    return state.cart.reduce(
        (total, product) => total + product.quantity, 0
    );
};

const cartValueSelector = (state) => {
    return state.cart.reduce(
        (total, product) => total + product.price * product.quantity, 0
    );
};

export {
    store,
    addProduct,
    removeProduct,
    cartCountSelector,
    cartValueSelector
};