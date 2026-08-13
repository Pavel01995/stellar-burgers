import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  removeIngredient,
  clearConstructor
} from '../../services/slices/constructorSlice';
import { fetchOrder, clearOrder } from '../../services/slices/orderSlice';
import { getUserData } from '../../services/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rawConstructorItems = useSelector((state) => state.burgerConstructor);
  const constructorItems = {
    bun: rawConstructorItems?.bun || null,
    ingredients: rawConstructorItems?.ingredients || []
  };

  const orderRequest = useSelector((state) => state.order?.loading || false);
  const orderModalData = useSelector((state) => state.order?.order || null);

  const user = useSelector(getUserData);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (item: TConstructorIngredient) => item._id
      ),
      constructorItems.bun._id
    ];
    dispatch(fetchOrder(ingredientIds))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      })
      .catch((err) => {
        console.error('Ошибка при создании заказа:', err);
      });
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const handleRemove = (id: string) => {
    dispatch(removeIngredient(id));
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      onRemove={handleRemove}
    />
  );
};
