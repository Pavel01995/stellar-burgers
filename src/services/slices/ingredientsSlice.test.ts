import {
  initialState,
  ingredientsReducer,
  fetchIngredients
} from './ingridientsSlice';

describe('Тесты для редьюсера ingredients', () => {
  test('возвращать начальное состояние при неизвестном экшене', () => {
    const action = { type: 'unknown' };
    const result = ingredientsReducer(undefined, action);
    expect(result).toEqual(initialState);
  });

  test('должен обрабатывать fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const result = ingredientsReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  test('должен обрабатывать fetchIngredients.fulfilled', () => {
    const mockIngredients = [{ id: '1', name: 'Булка' }];
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };

    const result=ingredientsReducer(
      {...initialState, loading:true},
      action
    );
    expect(result).toEqual({
      ...initialState,
      loading:false,
      ingredients:mockIngredients
    })
  });
  

  test('должен обрабатывать fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка сервера' }
    };

    const result = ingredientsReducer(
      { ...initialState, loading: true },
      action
    );

    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка сервера'
    });
  });
});
