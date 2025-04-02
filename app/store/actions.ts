"use client"

import {
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_SINGLE_PRODUCT,
    FETCH_SINGLE_PRODUCT_SUCCESS,
    FETCH_SINGLE_PRODUCT_FAILURE,
    FETCH_FEATURED_PRODUCTS,
    FETCH_FEATURED_PRODUCTS_SUCCESS,
    FETCH_FEATURED_PRODUCTS_FAILURE,
    FETCH_CATEGORIES,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
    SUBMIT_CONTACT,
    SUBMIT_CONTACT_SUCCESS,
    SUBMIT_CONTACT_FAILURE,
    SUBMIT_ORDER,
    SUBMIT_ORDER_SUCCESS,
    SUBMIT_ORDER_FAILURE,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    FETCH_CATEGORY_BY_SLUG ,
    FETCH_CATEGORY_BY_SLUG_SUCCESS ,
    FETCH_CATEGORY_BY_SLUG_FAILURE ,
   
    FETCH_PRODUCTS_BY_CATEGORY ,
    FETCH_PRODUCTS_BY_CATEGORY_SUCCESS ,
    FETCH_PRODUCTS_BY_CATEGORY_FAILURE,
    RESET_ORDER_STATE,
    RESET_CONTACT_STATE,
} from './constants';
import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { RootStateType } from './store';
// Base URL for API
const API_URL = 'https://pmart.pythonanywhere.com/store';

// Interfaces
interface Product {
    id: string | number;
    [key: string]: any;
}

interface ContactData {
    [key: string]: any;
}

interface OrderData {
    [key: string]: any;
}

interface CartUpdateData {
    productId: string | number;
    quantity: number;
}

interface ApiError {
    detail?: string;
    message?: string;
}

type DispatchType = Dispatch<any>;
import { getFeaturedProducts } from "@/lib/data"
const fallbackFeaturedProducts = getFeaturedProducts()

import { categories as fallbackCategories } from '@/lib/data';


export const fetchCategoryBySlug = (slug: string) => async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch({ type: FETCH_CATEGORY_BY_SLUG });
  
      const { data } = await axios.get(`${API_URL}/categories/${slug}/`);
      dispatch({ type: FETCH_CATEGORY_BY_SLUG_SUCCESS, payload: data });
    } catch (error: any) {
      console.error("Error fetching category by slug:", error.message);
      dispatch({ type: FETCH_CATEGORY_BY_SLUG_FAILURE, payload: error.message });
    }
  };
  
  export const fetchProductsByCategory = (slug: string) => async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch({ type: FETCH_PRODUCTS_BY_CATEGORY });
  
      const { data } = await axios.get(`${API_URL}/products/by-category/${slug}/`);
      dispatch({ type: FETCH_PRODUCTS_BY_CATEGORY_SUCCESS, payload: data });
    } catch (error: any) {
      console.error("Error fetching products by category:", error.message);
      dispatch({ type: FETCH_PRODUCTS_BY_CATEGORY_FAILURE, payload: error.message });
    }
  };
// Fetch Featured Products
export const fetchFeaturedProducts = () => async (dispatch: DispatchType): Promise<void> => {
  try {
    dispatch({ type: FETCH_FEATURED_PRODUCTS });

    const { data } = await axios.get(`${API_URL}/products/featured/`);
    dispatch({ type: FETCH_FEATURED_PRODUCTS_SUCCESS, payload: data });
  } catch (error: any) {
    console.error("Error fetching featured products:", error.message);
    dispatch({ type: FETCH_FEATURED_PRODUCTS_FAILURE, payload: fallbackFeaturedProducts });
  }
};

// Fetch Categories
export const fetchCategories = () => async (dispatch: DispatchType): Promise<void> => {
  try {
    dispatch({ type: FETCH_CATEGORIES });

    const { data } = await axios.get(`${API_URL}/categories/`);
    dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: data });
  } catch (error: any) {
    console.error("Error fetching categories:", error.message);
    dispatch({ type: FETCH_CATEGORIES_FAILURE, payload: fallbackCategories });
  }
};

// Actions
// export const fetchProducts = () => async (dispatch: DispatchType): Promise<void> => {
//     try {
//         dispatch({ type: FETCH_PRODUCTS });

//         const config = {
//             headers: {
//                 'Content-type': 'application/json'
//             }
//         };

//         const { data } = await axios.get(`${API_URL}/products/`, config);
//         dispatch({
//             type: FETCH_PRODUCTS_SUCCESS,
//             payload: data.results
//         });

//     } catch (error) {
//         const err = error as AxiosError<ApiError>;
//         dispatch({
//             type: FETCH_PRODUCTS_FAILURE,
//             payload: err.response?.data?.detail || err.message,
//         });
//     }
// };


export const fetchProducts = (page: number = 1, categories: string[] = [], sort: string = "featured") => async (dispatch: DispatchType): Promise<void> => {
    try {
        dispatch({ type: FETCH_PRODUCTS });

        const categoryQuery = categories.length > 0 ? `&categories=${categories.join(",")}` : ""; // Join categories with commas
        const sortQuery = `&sort=${sort}`; // Add sort parameter
        const { data } = await axios.get(`${API_URL}/products/?page=${page}${categoryQuery}${sortQuery}`);
        dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
            payload: {
                results: data.results,
                totalPages: Math.ceil(data.count / 10), // Assuming 10 products per page
            },
        });
    } catch (error) {
        const err = error as AxiosError<ApiError>;
        dispatch({
            type: FETCH_PRODUCTS_FAILURE,
            payload: err.response?.data?.detail || err.message,
        });
    }
};

export const fetchSingleProduct = (id: string | number) => async (dispatch: DispatchType): Promise<void> => {
    try {
        dispatch({ type: FETCH_SINGLE_PRODUCT });

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };

        const { data } = await axios.get(`${API_URL}/products/${id}/`, config);
        dispatch({
            type: FETCH_SINGLE_PRODUCT_SUCCESS,
            payload: data
        });

    } catch (error) {
        const err = error as AxiosError<ApiError>;
        dispatch({
            type: FETCH_SINGLE_PRODUCT_FAILURE,
            payload: err.response?.data?.detail || err.message,
        });
    }
};



export const submitContact = (contactData: ContactData) => async (dispatch: DispatchType): Promise<void> => {
    try {
        dispatch({ type: SUBMIT_CONTACT });

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };

        const { data } = await axios.post(`${API_URL}/contact/`, contactData, config);
        dispatch({
            type: SUBMIT_CONTACT_SUCCESS,
            payload: data
        });

    } catch (error) {
        const err = error as AxiosError<ApiError>;
        dispatch({
            type: SUBMIT_CONTACT_FAILURE,
            payload: err.response?.data?.detail || err.message,
        });
    }
};



export const submitOrder = (orderData: OrderData, platform: "fiverr" | "upwork") => async (dispatch: DispatchType): Promise<void> => {
    try {
        dispatch({ type: SUBMIT_ORDER });

        const formData = new FormData();
        formData.append("platform", platform); // Add platform to form data
        formData.append("orderDetails", JSON.stringify(orderData)); // Add order details as JSON

        if (orderData.attachedFile) {
            formData.append("file", orderData.attachedFile); // Attach file if provided
        }

        const config = {
            headers: {
                "Content-Type": "multipart/form-data", // Use multipart for file uploads
            },
        };

        const { data } = await axios.post(`${API_URL}/orders/`, formData, config);
        dispatch({
            type: SUBMIT_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const err = error as AxiosError<ApiError>;
        dispatch({
            type: SUBMIT_ORDER_FAILURE,
            payload: err.response?.data?.detail || err.message,
        });
    }
};

// Cart Actions (Synchronous)
export const addToCart = (product: Product) => ({
    type: ADD_TO_CART,
    payload: product
});

export const removeFromCart = (productId: string | number) => ({
    type: REMOVE_FROM_CART,
    payload: productId
});

export const updateCartQuantity = (updateData: CartUpdateData) => ({
    type: UPDATE_CART_QUANTITY,
    payload: updateData
});

export const clearCart = () => ({
    type: CLEAR_CART
});


export const searchProducts = (query: string) => async (dispatch: DispatchType): Promise<void> => {
    try {
        dispatch({ type: FETCH_PRODUCTS });

        const { data } = await axios.get(`${API_URL}/products/?search=${encodeURIComponent(query)}`);
        dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
            payload: {
                results: data.results,
                totalPages: Math.ceil(data.count / 10), // Assuming 10 products per page
            },
        });
    } catch (error) {
        const err = error as AxiosError<ApiError>;
        dispatch({
            type: FETCH_PRODUCTS_FAILURE,
            payload: err.response?.data?.detail || err.message,
        });
    }
};

export const resetOrderState = () => ({
    type: RESET_ORDER_STATE,
});


