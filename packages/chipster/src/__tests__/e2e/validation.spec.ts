import { test, expect } from '@playwright/test'

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
    const validationChipster = page.getByTestId('validation-chipster')
    const input = validationChipster.getByPlaceholder('Add items')
    
    await input.type('valid item')
    await input.press('Enter')
    
    // Item should be added
    await expect(validationChipster.getByText('valid item')).toBeVisible()
    // Input should be cleared
    await expect(input).toHaveValue('')
    // No error message should be visible
    await expect(validationChipster.getByText('Min 3 characters')).not.toBeVisible()
  })

  test('clears error when input becomes valid', async ({ page }) => {
    const validationChipster = page.getByTestId('validation-chipster')
    const input = validationChipster.getByPlaceholder('Add items')
    
    // First try invalid input
    await input.type('ab')
    await input.press('Enter')
    await expect(validationChipster.getByText('Min 3 characters')).toBeVisible()
    
    // Then make it valid
    await input.type('c')
    await input.press('Enter')
    await expect(validationChipster.getByText('Min 3 characters')).not.toBeVisible()
    await expect(validationChipster.getByText('abc')).toBeVisible()
  })
}) 