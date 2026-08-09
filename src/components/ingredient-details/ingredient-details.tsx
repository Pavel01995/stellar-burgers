import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/ingridientsSlice';
import { IngredientDetailsUI } from '@ui';
import { Preloader } from '@ui';

export const IngredientDetails: FC = () => {
  const { id } = useParams();

  const ingredients = useSelector(getIngredients);

  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }
  console.log;

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
