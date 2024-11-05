import { test, expect } from '@playwright/test'

test.describe('Chipster Input Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders input chipster with custom placeholder', async ({ page }) => {
    const inputChipster = page.getByTestId('input-chipster')
    await expect(inputChipster).toBeVisible()
    
    const input = inputChipster.getByPlaceholder('Custom placeholder')
    await expect(input).toBeVisible()
  })

  test('has custom class applied', async ({ page }) => {
    const input = page.getByTestId('input-chipster').getByRole('textbox')
    await expect(input).toHaveClass(/custom-input-class/)
  })

  test('handles input changes', async ({ page }) => {
    const input = page.getByTestId('input-chipster').getByRole('textbox')
    
    await input.type('test')
    await expect(input).toHaveValue('test')
  })
})