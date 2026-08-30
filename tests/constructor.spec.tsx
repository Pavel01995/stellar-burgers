import { test, expect } from '@playwright/test';

test.describe('проверка функциональности конструктора', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/hars/constructor.har', {
      update: false,
      url: '**/api/ingredients',
      notFound: 'abort'
    });

    await page.goto('/');
  });

  test('добавить булку в конструктора', async ({ page }) => {
    await page
      .locator('li:has(a[href*="/ingredients/643d69a5c3f7b9001cfa093c"])')
      .getByRole('button', { name: 'Добавить' })
      .click();
    await expect(
      page
        .locator('.constructor-element')
        .filter({ hasText: 'Краторная булка N-200i' })).toHaveCount(2);
  });

  test('добавить начинку в конструктора', async ({ page }) => {
    await page
      .locator('li:has(a[href*="/ingredients/643d69a5c3f7b9001cfa0941"])')
      .getByRole('button', { name: 'Добавить' })
      .click();
    await expect(
      page
        .locator('.constructor-element')
        .filter({ hasText: 'Биокотлета из марсианской Магнолии' })
        .first()
    ).toBeVisible();
  });

  test('добавить соус в конструктора', async ({ page }) => {
    await page
      .locator('li:has(a[href*="/ingredients/643d69a5c3f7b9001cfa0942"])')
      .getByRole('button', { name: 'Добавить' })
      .click();
    await expect(
      page
        .locator('.constructor-element')
        .filter({ hasText: 'Соус Spicy-X' })
        .first()
    ).toBeVisible();
  });
});
