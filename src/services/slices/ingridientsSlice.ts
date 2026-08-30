import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const ingredients = await getIngredientsApi();
    return ingredients;
  }
);

type TIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIngredientsLoading: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })

      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      });
  }
});

export const { getIngredients, getIngredientsLoading } =
  ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;
