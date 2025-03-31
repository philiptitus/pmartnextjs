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
 FETCH_CATEGORY_BY_SLUG ,
 FETCH_CATEGORY_BY_SLUG_SUCCESS ,
 FETCH_CATEGORY_BY_SLUG_FAILURE ,

 FETCH_PRODUCTS_BY_CATEGORY ,
 FETCH_PRODUCTS_BY_CATEGORY_SUCCESS ,
 FETCH_PRODUCTS_BY_CATEGORY_FAILURE,
 RESET_ORDER_STATE,

} from './constants'

import { categories as fallbackCategories } from '@/lib/data';

interface Product {
    id: string | number;
    [key: string]: any;
}

interface Category {
    id: string | number;
    [key: string]: any;
}

interface ActionType {
    type: string;
    payload?: any;
}

interface BaseState {
    loading?: boolean;
    error?: string;
}

interface ProductsState extends BaseState {
    products: Product[];
}

interface SingleProductState extends BaseState {
    product: Product | null;
}

interface FeaturedProductsState extends BaseState {
    featuredProducts: Product[];
}

interface CategoriesState extends BaseState {
    categories: Category[];
}

interface SubmissionState extends BaseState {
    success?: boolean;
}


export const categoryBySlugReducer = (
    state = { category: null, loading: false, error: null },
    action: ActionType
  ) => {
    switch (action.type) {
      case FETCH_CATEGORY_BY_SLUG:
        return { ...state, loading: true, error: null };
      case FETCH_CATEGORY_BY_SLUG_SUCCESS:
        return { loading: false, category: action.payload, error: null };
      case FETCH_CATEGORY_BY_SLUG_FAILURE:
        return { loading: false, category: null, error: action.payload };
      default:
        return state;
    }
  };
  
  export const productsByCategoryReducer = (
    state = { products: [], loading: false, error: null },
    action: ActionType
  ) => {
    switch (action.type) {
      case FETCH_PRODUCTS_BY_CATEGORY:
        return { ...state, loading: true, error: null };
      case FETCH_PRODUCTS_BY_CATEGORY_SUCCESS:
        return { loading: false, products: action.payload, error: null };
      case FETCH_PRODUCTS_BY_CATEGORY_FAILURE:
        return { loading: false, products: [], error: action.payload };
      default:
        return state;
    }
  };

// export const productsReducer = (
//     state = { products: [], loading: false, error: null },
//     action: ActionType
//   ) => {
//     switch (action.type) {
//       case FETCH_PRODUCTS:
//         return { ...state, loading: true, error: null };
//       case FETCH_PRODUCTS_SUCCESS:
//         return { loading: false, products: action.payload, error: null };
//       case FETCH_PRODUCTS_FAILURE:
//         return { loading: false, products: [], error: action.payload };
//       default:
//         return state;
//     }
//   };

export const productsReducer = (
    state = { products: [], loading: false, error: null, totalPages: 1 },
    action: ActionType
) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return { ...state, loading: true, error: null };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.results, // Replace products with the new page's data
                totalPages: action.payload.totalPages, // Update total pages
                error: null,
            };
        case FETCH_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const singleProductReducer = (state: SingleProductState = { product: null }, action: ActionType): SingleProductState => {
    switch (action.type) {
        case FETCH_SINGLE_PRODUCT:
            return { ...state, loading: true }
        case FETCH_SINGLE_PRODUCT_SUCCESS:
            return { loading: false, product: action.payload }
        case FETCH_SINGLE_PRODUCT_FAILURE:
            return { loading: false, product: null, error: action.payload }
        default:
            return state
    }
}

export const featuredProductsReducer = (state = {  loading: false, error: null }, action: ActionType) => {
    switch (action.type) {
        case FETCH_FEATURED_PRODUCTS:
            return { ...state, loading: true, error: null };
        case FETCH_FEATURED_PRODUCTS_SUCCESS:
            return { loading: false, featuredProducts: action.payload, error: null };
        case FETCH_FEATURED_PRODUCTS_FAILURE:
            return { loading: false,  error: action.payload };
        default:
            return state;
    }
};

export const categoriesReducer = (
    state = {  loading: false, error: null }, 
    action: ActionType
  ) => {
      switch (action.type) {
          case FETCH_CATEGORIES:
              return { ...state, loading: true, error: null };
          case FETCH_CATEGORIES_SUCCESS:
              return { 
                  loading: false, 
                  categories:  action.payload , 
                  error: null 
              };
          case FETCH_CATEGORIES_FAILURE:
              return { 
                  loading: false, 
                  categories: Array.isArray(fallbackCategories) ? fallbackCategories : [], 
                  error: action.payload 
              };
          default:
              return state;
      }
  };

export const contactReducer = (state: SubmissionState = {}, action: ActionType): SubmissionState => {
    switch (action.type) {
        case SUBMIT_CONTACT:
            return { loading: true }
        case SUBMIT_CONTACT_SUCCESS:
            return { loading: false, success: true }
        case SUBMIT_CONTACT_FAILURE:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const orderReducer = (state: SubmissionState = {}, action: ActionType): SubmissionState => {
    switch (action.type) {
        case SUBMIT_ORDER:
            return { loading: true };
        case SUBMIT_ORDER_SUCCESS:
            return { loading: false, success: true };
        case SUBMIT_ORDER_FAILURE:
            return { loading: false, error: action.payload };
        case RESET_ORDER_STATE: // Handle reset action
            return { loading: false, success: false, error: null };
        default:
            return state;
    }
};