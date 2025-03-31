"use client"

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { 
    productsReducer,
    singleProductReducer,
    featuredProductsReducer,
    categoriesReducer,
    contactReducer,
    orderReducer,
    categoryBySlugReducer,
    productsByCategoryReducer,
} from './reducers';

// Define types for state
interface CartItem {
    id: string | number;
    quantity: number;
    [key: string]: any;
}

interface RootState {
    products: {
        loading?: boolean;
        products?: any[];
        error?: string;
    };
    singleProduct: {
        loading?: boolean;
        product?: any;
        error?: string;
    };
    featuredProducts: {
        loading?: boolean;
        featuredProducts?: any[];
        error?: string;
    };
    categories: {
        loading?: boolean;
        categories?: any[];
        error?: string;
    };
    contact: {
        loading?: boolean;
        success?: boolean;
        error?: string;
    };
    order: {
        loading?: boolean;
        success?: boolean;
        error?: string;
    };
    cart: {
        cartItems: CartItem[];
    };
}

// Combine reducers
const reducer = combineReducers({
    products: productsReducer,
    singleProduct: singleProductReducer,
    featuredProducts: featuredProductsReducer,
    categories: categoriesReducer,
    contact: contactReducer,
    order: orderReducer,
    categoryBySlug: categoryBySlugReducer, // Add this
    productsByCategory: productsByCategoryReducer, // Add this
});

// Initial state
const initialState = {};

// Middleware configuration
const middleware = [thunk];

// Create store
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export type AppDispatch = typeof store.dispatch;
export type RootStateType = ReturnType<typeof reducer>;
export default store;
