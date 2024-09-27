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

    test('login page can be opened', async ({ page }) => {
        const locator = await page.getByText('Blogs')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Blog app, FullStackOpen, Tuomas Liikala 2024')).toBeVisible()
    })
})