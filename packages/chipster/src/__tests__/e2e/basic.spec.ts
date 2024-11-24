import { test, expect } from '@playwright/test'
import { addItem } from './helpers'

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
    await addItem(page, 'basic-chipster', 'test item')
  })

  test('adds items with comma joiner', async ({ page }) => {
    const basicChipster = page.getByTestId('basic-chipster')
    const input = basicChipster.getByPlaceholder('Add items')
    
    await input.fill('first item,')
    await expect(basicChipster.getByText('first item')).toBeVisible()
    await expect(input).toHaveValue('')
  })

  test('adds items with multiple joiners', async ({ page }) => {
    const basicChipster = page.getByTestId('basic-chipster')
    const input = basicChipster.getByPlaceholder('Add items')
    
    await input.fill('first item,')
    await expect(basicChipster.getByText('first item')).toBeVisible()
    
    await input.type('second item')
    await input.press('Enter')
    await expect(basicChipster.getByText('second item')).toBeVisible()
    
    await expect(input).toHaveValue('')
  })

  test('ignores empty values with joiners', async ({ page }) => {
    const basicChipster = page.getByTestId('basic-chipster')
    const input = basicChipster.getByPlaceholder('Add items')
    
    // Try adding empty values with different methods
    await input.fill(',')
    await page.waitForTimeout(100)
    await input.clear()
    
    await input.fill(' ,')
    await page.waitForTimeout(100)
    await input.clear()
    
    await input.fill('   ')
    await input.press('Enter')
    await page.waitForTimeout(100)
    
    // No empty items should be added
    const items = await basicChipster.locator('[role="button"]').count()
    expect(items).toBe(0)
  })

  test('trims whitespace when using joiners', async ({ page }) => {
    const basicChipster = page.getByTestId('basic-chipster')
    const input = basicChipster.getByPlaceholder('Add items')
    
    await expect(input).toBeVisible({ timeout: 30000 })
    await input.fill('  spaced item  ')
    await input.press('Enter')
    
    // Should show trimmed version
    await expect(basicChipster.getByText('spaced item')).toBeVisible({ timeout: 30000 })
    
    // Original untrimmed version should not exist
    const untrimmedCount = await basicChipster.getByText(/^\s+spaced item\s+$/).count()
    expect(untrimmedCount).toBe(0)
  })
})