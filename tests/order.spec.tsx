import { test, expect } from '@playwright/test';

const short_access = 'Bearer  short-token';
const short_refresh = 'short-refresh';

test.describe('Тестирование функционала бургера и авторизации', () => {
  test.beforeEach(async ({ context, page }) => {
    await context.addCookies([
      {
        name: 'accessToken',
        value: short_access,
        domain: 'localhost',
        path: '/'
      }
    ]);

    await page.addInitScript((tokenValue) => {
      window.localStorage.setItem('refreshToken', tokenValue);
    }, short_refresh);

    await page.routeFromHAR('tests/hars/user.har', {
      url: '**/api/auth/user',
      update: false,
      notFound: 'abort'
    });

    // await page.routeFromHAR('tests/hars/order.har', {   Здравствуйте не смог реализовать запрос через HAR,
    //   url: '**/api/orders',                              не в какую не поддается постаил через  route.
    //   update: false,
    //   notFound: 'abort'
    // });

    await page.route('**/api/orders', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          name: 'Био-марсианский краторный бургер',
          order: {
            number: 109536
          }
        })
      });
    });

    await page.goto('/');

    await expect(page.getByText('Соберите бургер')).toBeVisible();

    await page
      .locator('li')
      .filter({ hasText: 'Краторная булка N-200i' })
      .getByRole('button', { name: 'Добавить' })
      .click();

    await page
      .locator('li')
      .filter({ hasText: 'Биокотлета из марсианской Магнолии' })
      .getByRole('button', { name: 'Добавить' })
      .click();
    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    await expect(page.locator('h2').getByText('109536')).toBeVisible({
      timeout: 0
    });

    await page.locator('#modals button').click();

    await expect(page.locator('#modals h2')).not.toBeVisible();

    await expect(page.locator('.constructor-element')).toHaveCount(0);
  });
});
