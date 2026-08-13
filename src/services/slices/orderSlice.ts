import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';
import { getOrderByNumberApi } from '@api';

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return { response, ingredients };
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchByNumber',
  async (number: number) => {
    const data = await getOrderByNumberApi(number);
    return data.orders[0];
  }
);

type TOrderState = {
  order: TOrder | null;
  loading: boolean;
  error: string | null;
  orderData: TOrder | null;
};

const initialState: TOrderState = {
  order: null,
  loading: false,
  error: null,
  orderData: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },
  selectors: {
    getOrder: (state) => state.order,
    getOrderLoading: (state) => state.loading,
    getOrderData: (state) => state.orderData
  },

  extraReducers: (builder) => {
    builder
      // Обработка fetchOrder
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.order = {
          ...action.payload.response.order,
          ingredients: action.payload.ingredients
        };
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      })

      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      });
  }
});

export const { getOrder, getOrderLoading, getOrderData } = orderSlice.selectors;
export const orderReducer = orderSlice.reducer;
export const { clearOrder } = orderSlice.actions;
