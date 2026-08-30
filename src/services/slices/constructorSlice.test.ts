import constructorReducer, {
  initialState,
  removeIngredient,
  moveDown,
  moveUp,
  clearConstructor,
  addIngredient
} from './constructorSlice';

describe('тесты для редьюсеров ConstructorSlice', () => {
  test('должен возвращать начальное состояние при неизвестном экшене', () => {
    const action = { type: 'unknown_action' };
    const result = constructorReducer(undefined, action);
    expect(result).toEqual(initialState);
  });

  test('должен добавлять булку в конструктор', () => {
    const bun = { _id: '1', name: 'Булка', type: 'bun' };
    const action = addIngredient(bun as any);
    const result = constructorReducer(initialState, action);
    expect(result.bun).toMatchObject({
      ...bun,
      id: expect.any(String)
    });
  });

  test('должен удалять ингредиент по id', () => {
    const startState = {
      bun: null,
      ingredients: [
        {
          _id: '2',
          name: 'Соус Spicy-X',
          type: 'main',
          price: 90,
          id: 'ingredient-123'
        }
      ]
    };
    const action = removeIngredient('ingredient-123');
    const result = constructorReducer(startState as any, action);
    expect(result.ingredients).toHaveLength(0);
  });

  test('должен перемещать ингредиент вверх по списку', () => {
    const startState = {
      bun: null,
      ingredients: [
        { _id: '1', name: 'Первый', type: 'main', price: 50, id: 'id-1' },
        { _id: '2', name: 'Второй', type: 'main', price: 60, id: 'id-2' }
      ]
    };

    const result = constructorReducer(startState as any, moveUp(1));
    expect(result.ingredients[0].id).toBe('id-2');
    expect(result.ingredients[1].id).toBe('id-1');
  });

  test('должен перемещать ингредиент вниз по списку', () => {
    const startState = {
      bun: null,
      ingredients: [
        { _id: '1', name: 'Первый', type: 'main', price: 50, id: 'id-1' },
        { _id: '2', name: 'Второй', type: 'main', price: 60, id: 'id-2' }
      ]
    };

    const result = constructorReducer(startState as any, moveDown(0));

    expect(result.ingredients[0].id).toBe('id-2');
    expect(result.ingredients[1].id).toBe('id-1');
  });

  test('должен полностью очищать конструктор', () => {
    const startState = {
      bun: { _id: 'bun-1', name: 'Булка', type: 'bun', price: 200, id: 'b-1' },
      ingredients: [
        { _id: '1', name: 'Соус', type: 'main', price: 50, id: 'id-1' }
      ]
    };
    const result = constructorReducer(startState as any, clearConstructor());
    expect(result).toEqual(initialState);
  });
});
