import { test, expect } from '@playwright/test'
import { addItem } from './helpers'

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
    await addItem(page, 'itemlist-chipster', 'test item', 'Add list items')
    
    const list = itemListChipster.locator('.custom-list-class')
    await expect(list).toBeVisible()
    await expect(itemListChipster.getByText('test item')).toBeVisible()
  })

  test('removes items with custom remove icon', async ({ page }) => {
    const itemListChipster = page.getByTestId('itemlist-chipster')
    await addItem(page, 'itemlist-chipster', 'test item', 'Add list items')
    
    // Find and click remove button using the custom class
    const removeButton = itemListChipster.locator('.custom-remove-button')
    await expect(removeButton).toBeVisible()
    await removeButton.click()
    
    // Verify item is removed
    await expect(itemListChipster.getByText('test item')).not.toBeVisible()
  })

  test('applies custom classes to items', async ({ page }) => {
    const itemListChipster = page.getByTestId('itemlist-chipster')
    await addItem(page, 'itemlist-chipster', 'test item', 'Add list items')
    
    // Verify custom classes are applied
    await expect(itemListChipster.locator('.custom-item-class')).toBeVisible()
    await expect(itemListChipster.locator('.custom-remove-button')).toBeVisible()
  })
}) 