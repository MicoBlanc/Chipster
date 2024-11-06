import { test, expect } from '@playwright/test'

test.describe('Chipster ItemList Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders itemlist chipster', async ({ page }) => {
    const itemListChipster = page.getByTestId('itemlist-chipster')
    await expect(itemListChipster).toBeVisible()
    
    const input = itemListChipster.getByPlaceholder('Add list items')
    await expect(input).toBeVisible()
  })

  test('adds items to the list', async ({ page }) => {
    const itemListChipster = page.getByTestId('itemlist-chipster')
    const input = itemListChipster.getByPlaceholder('Add list items')
    
    await input.type('test item')
    await input.press('Enter')
    
    const list = itemListChipster.locator('.custom-list-class')
    await expect(list).toBeVisible()
    await expect(itemListChipster.getByText('test item')).toBeVisible()
  })

  test('removes items with custom remove icon', async ({ page }) => {
    const itemListChipster = page.getByTestId('itemlist-chipster')
    const input = itemListChipster.getByPlaceholder('Add list items')
    
    // Add an item
    await input.type('test item')
    await input.press('Enter')
    
    // Find and click remove button
    const removeButton = itemListChipster.getByText('×')
    await removeButton.click()
    
    // Verify item was removed
    await expect(itemListChipster.getByText('test item')).not.toBeVisible()
  })

  test('applies custom classes to items', async ({ page }) => {
    const itemListChipster = page.getByTestId('itemlist-chipster')
    const input = itemListChipster.getByPlaceholder('Add list items')
    
    await input.type('test item')
    await input.press('Enter')
    
    // Check for custom classes
    const item = itemListChipster.locator('.custom-item-class')
    await expect(item).toBeVisible()
    const removeButton = itemListChipster.locator('.custom-remove-button')
    await expect(removeButton).toBeVisible()
  })
}) 