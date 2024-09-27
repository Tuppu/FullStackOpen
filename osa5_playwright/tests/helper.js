const { expect } = require('@playwright/test')

const loginWith = async (page, username, password)  => {
    await page.getByRole('button', { name: 'log in' }).click()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByTestId('blogTitle').fill(title)
    await page.getByTestId('blogAuthor').fill(author)
    await page.getByTestId('blogUrl').fill(url)
    await page.getByRole('button', { name: 'create' }).click()
  }

const confirmer = async (page) => {
    
            
    console.log('hello');

    await page.on("dialog", async (dialogWindow) => {
        console.log(dialogWindow.message())
        expect(dialogWindow.type()).toContain("confirm")
        expect(dialogWindow.message()).toContain("Delete a blog created by playwright")

        await dialogWindow.accept()
    })

    await page.getByRole('button', { name: 'remove' }).click()
  }

export { loginWith, createBlog, confirmer }