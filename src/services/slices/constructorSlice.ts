import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: nanoid()
        }
      })
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },

    moveUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const prevIndex = index - 1;
        const temp = state.ingredients[index];
        state.ingredients[index] = state.ingredients[prevIndex];
        state.ingredients[prevIndex] = temp;
      }
    },

    moveDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.ingredients.length - 1) {
        const nextIndex = index + 1;
        const temp = state.ingredients[index];
        state.ingredients[index] = state.ingredients[nextIndex];
        state.ingredients[nextIndex] = temp;
      }
    },

    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getConstructorIngredients: (state) => state.ingredients,
    getConstructorBun: (state) => state.bun
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveUp,
  moveDown,
  clearConstructor
} = constructorSlice.actions;

export const { getConstructorIngredients, getConstructorBun } =
  constructorSlice.selectors;

export default constructorSlice.reducer;
