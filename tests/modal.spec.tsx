import { test, expect } from '@playwright/test';

test.describe('проверка модальных окон', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/hars/constructor.har', {
      update: false,
      url: '**/api/ingredients',
      notFound: 'abort'
    });
    await page.goto('/');
  });

  test('открытие модального окна игредиента', async ({ page }) => {
    await page
      .locator('li:has(a[href*="/ingredients/643d69a5c3f7b9001cfa0942"])')
      .click();

    await expect(page.locator('text=Детали ингредиента')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Соус Spicy-X' })
    ).toBeVisible();
  });

  test('закрытие модального окна по клику на крестик', async ({ page }) => {
    await page
      .locator('li:has(a[href*="/ingredients/643d69a5c3f7b9001cfa0942"])')
      .click();
    await expect(page.locator('text=Детали ингредиента')).toBeVisible();

    await page.locator('#modals button').click();

    await expect(page.locator('text=Детали ингредиента')).not.toBeVisible();
  });

  test('закрытие по оверлею', async ({ page }) => {
    await page
      .locator('li:has(a[href*="/ingredients/643d69a5c3f7b9001cfa0942"])')
      .click();
    await expect(page.locator('text=Детали ингредиента')).toBeVisible();
    await page
      .locator('#modals > div')
      .filter({ hasNotText: 'Детали ингредиента' })
      .click({ position: { x: 0, y: 0 } }); 
    await expect(page.locator('text=Детали ингредиента')).not.toBeVisible();
  });
});
