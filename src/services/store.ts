import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingridientsSlice';
import { authReducer } from './slices/authSlice';
import { orderReducer } from './slices/orderSlice';
import { feedReducer } from './slices/feedSlice';
import { constructorSlice } from './slices/constructorSlice';
import { ordersReducer } from './slices/ordersSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer,
  order: orderReducer,
  feeds: feedReducer,
  burgerConstructor: constructorSlice.reducer,
  orders: ordersReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
