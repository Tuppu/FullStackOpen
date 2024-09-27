const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http:localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
          data: {
            name: 'Tuomas Liikala',
            username: 'tuppu',
            password: 'salsasalsa'
          }
        })

        await page.goto('http://localhost:5173')
      })

    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByText('Blogs')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Blog app, FullStackOpen, Tuomas Liikala 2024')).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByRole('button', { name: 'log in' }).click()
            await page.getByTestId('username').fill('tuppu')
            await page.getByTestId('password').fill('salsasalsa')
            await page.getByRole('button', { name: 'login' }).click()
        
            await expect(page.getByText('Tuomas Liikala logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByRole('button', { name: 'log in' }).click()
            await page.getByTestId('username').fill('wrongUser')
            await page.getByTestId('password').fill('wrongPw')
            await page.getByRole('button', { name: 'login' }).click()
        
            await expect(page.getByText('invalid username or password')).toBeVisible()
        })
    })
})