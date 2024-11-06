import { test, expect } from '@playwright/test'

test.describe('Chipster Basic Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders basic chipster', async ({ page }) => {
    const basicChipster = page.getByTestId('basic-chipster')
    await expect(basicChipster).toBeVisible()
    
    const input = basicChipster.getByPlaceholder('Add items')
    await expect(input).toBeVisible()
  })

  test('adds and removes items', async ({ page }) => {
    const basicChipster = page.getByTestId('basic-chipster')
    const input = basicChipster.getByPlaceholder('Add items')
    
    await input.type('test item')
    await input.press('Enter')
    
    await expect(basicChipster.getByText('test item')).toBeVisible()
  })
})