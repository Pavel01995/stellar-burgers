import { test, expect } from '@playwright/test';

test('Авторизация с подменой данных пользователя (без HAR)', async ({
  page
}) => {
  // 1. Перехватываем запрос и моментально отдаем нужный JSON
  await page.route('**/api/auth/user', async (route) => {
    await route.fulfill({
      json: {
        success: true,
        user: {
          email: 'pv@mail.ru',
          name: 'pavel'
        }
      }
    });
  });

  // 2. Переходим на страницу логина
  await page.goto('http://localhost:4000/login');

  // 3. Заполняем форму
  await page.fill('input[name="email"]', 'pv@mail.ru');
  await page.fill('input[name="password"]', 'ТВОЙ_ПАРОЛЬ');

  // 4. Кликаем "Войти"
  await page.click('button[type="submit"]');

  // 5. Ждем перехода в профиль.
  // Приложение сделает запрос за профилем, но Playwright перехватит его
  // и отдаст мок из шага 1, даже не обращаясь к реальному серверу.
  await page.waitForURL('**/profile');
});
