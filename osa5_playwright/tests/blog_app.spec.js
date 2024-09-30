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

        await request.post('/api/users', {
            data: {
              name: 'Another User',
              username: 'anotherUser',
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

        test('a new blog can be liked', async ({ page }) => {
            await createBlog(page, 'a blog created by playwright', 'playwright', 'https://playwright.dev/', true)

            const successDiv = await page.locator('.success')
            await expect(successDiv).toContainText('a new blog a blog created by playwright by playwright added')
            await expect(page.getByText('a blog created by playwright playwright')).toBeVisible()

            await page.getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click()

            const likeDiv = await page.locator('.blogLikes').first()
            await expect(likeDiv).toContainText('1')
        })

        test('a blog can be deleted', async ({ page }) => {
            await createBlog(page, 'a blog created by playwright', 'playwright', 'https://playwright.dev/', true)

            const successDiv = await page.locator('.success')
            await expect(successDiv).toContainText('a new blog a blog created by playwright by playwright added')
            await expect(page.getByText('a blog created by playwright playwright')).toBeVisible()

            await page.getByRole('button', { name: 'view' }).click()

            await page.on("dialog", async (dialogWindow) => {
                console.log(dialogWindow.message())
                expect(dialogWindow.type()).toContain("confirm")
                expect(dialogWindow.message()).toContain("Delete a blog created by playwright")
        
                await dialogWindow.accept()
            })
            await expect(page.getByText('like')).toBeVisible()
            await page.getByRole('button', { name: 'like' }).click()
            await expect(page.getByText('remove')).toBeVisible()
            await page.getByRole('button', { name: 'remove' }).click()

            await expect(page.getByText('a blog a blog created by playwright by playwright removed')).toBeVisible()
        })

        test('a blog can be deleted just by the person who added it', async ({ page }) => {
            await createBlog(page, 'a blog created by playwright', 'playwright', 'https://playwright.dev/', true)

            const successDiv = await page.locator('.success')
            await expect(successDiv).toContainText('a new blog a blog created by playwright by playwright added')
            await expect(page.getByText('a blog created by playwright playwright')).toBeVisible()

            await page.getByRole('button', { name: 'view' }).click()

            await page.on("dialog", async (dialogWindow) => {
                console.log(dialogWindow.message())
                expect(dialogWindow.type()).toContain("confirm")
                expect(dialogWindow.message()).toContain("Delete a blog created by playwright")
        
                await dialogWindow.accept()
            })


            await expect(page.getByText('logout')).toBeVisible()
            await page.getByRole('button', { name: 'logout' }).click()
            await page.getByRole('button', { name: 'cancel' }).click()

            await loginWith(page, 'anotherUser', 'salsasalsa')

            await page.getByRole('button', { name: 'view' }).click()
            await expect(page.getByText('like')).toBeVisible()
            await page.getByRole('button', { name: 'like' }).click()
            const likeDiv = await page.locator('.blogLikes').first()
            await expect(likeDiv).toContainText('1')
            
            await expect(page.getByText('remove')).not.toBeVisible()
        })
    })
})

describe('Many blogs', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset2')
        await request.post('/api/users', {
            data: {
              name: 'Tuomas Liikala',
              username: 'tuppu',
              password: 'salsasalsa'
            }
          })
        await page.goto('/')
    })

    test('sorting the blogs by likes', async ({ page }) => {

        await loginWith(page, 'tuppu', 'salsasalsa')
        await expect(page.getByText('Tuomas Liikala logged in')).toBeVisible()
        await createBlog(page, 'a blog created by playwright', 'playwright', 'https://playwright.dev/')

        const successDiv = await page.locator('.success')
        await expect(successDiv).toContainText('a new blog a blog created by playwright by playwright added')
        await expect(page.getByText('a blog created by playwright playwright')).toBeVisible()

        const views = await page.getByRole('button', { name: 'view' }).all()
        views[0].click()
        
        const blogDiv = await page.locator('.blog').first()
        await expect(blogDiv).toContainText('toka Tuomas Liikala ')
    })
})  