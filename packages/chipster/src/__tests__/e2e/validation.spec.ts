import { test, expect } from '@playwright/test'
import { addItem } from './helpers'

test.describe('Chipster Validation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders validation chipster', async ({ page }) => {
    const validationChipster = page.getByTestId('validation-chipster')
    await expect(validationChipster).toBeVisible()
    
    const input = validationChipster.getByPlaceholder('Add items')
    await expect(input).toBeVisible()
  })

  test('shows error for short input', async ({ page }) => {
    const validationChipster = page.getByTestId('validation-chipster')
    const input = validationChipster.getByPlaceholder('Add items')
    
    await input.type('ab')
    await input.press('Enter')
    
    // Error message should be visible
    await expect(validationChipster.getByText('Min 3 characters')).toBeVisible()
    // Input should still contain the value
    await expect(input).toHaveValue('ab')
  })

  test('allows valid input', async ({ page }) => {
    await addItem(page, 'validation-chipster', 'valid item')
  })

  test('clears error when input becomes valid', async ({ page }) => {
    const validationChipster = page.getByTestId('validation-chipster')
    const input = validationChipster.getByPlaceholder('Add items')
    
    await expect(input).toBeVisible()
    await input.type('ab')
    await input.press('Enter')
    await expect(validationChipster.getByText('Min 3 characters')).toBeVisible()
    
    await input.type('c')
    await input.press('Enter')
    await expect(validationChipster.getByText('Min 3 characters')).not.toBeVisible()
    await expect(validationChipster.getByText('abc')).toBeVisible()
  })
}) 