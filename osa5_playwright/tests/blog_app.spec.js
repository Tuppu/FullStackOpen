const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
          data: {
            name: 'Tuomas Liikala',
            username: 'tuppu',
            password: 'salsasalsa'
          }
        })

        await page.goto('/')
      })

    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByText('Blogs')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Blog app, FullStackOpen, Tuomas Liikala 2024')).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'tuppu', 'salsasalsa')
        
            await expect(page.getByText('Tuomas Liikala logged in')).toBeVisible()
        })

        test('fails with uncorrect credentials', async ({ page }) => {
            await loginWith(page, 'wrongUser', 'wrongPw')
        
            const errorDiv = await page.locator('.error')
            await expect(errorDiv).toContainText('invalid username or password')
            await expect(page.getByText('Tuomas Liikala logged in')).not.toBeVisible()
        })
    })
    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'tuppu', 'salsasalsa')
        })
    
        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'a blog created by playwright', 'playwright', 'https://playwright.dev/')

            const successDiv = await page.locator('.success')
            await expect(successDiv).toContainText('a new blog a blog created by playwright by playwright added')

            await expect(page.getByText('a blog created by playwright playwright')).toBeVisible()
        })
    })  
})