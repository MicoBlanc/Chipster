import { test, expect } from '@playwright/test'

test.describe('Chipster Suggestions Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders suggestions chipster', async ({ page }) => {
    const suggestionsChipster = page.getByTestId('suggestions-chipster')
    await expect(suggestionsChipster).toBeVisible()
    
    const input = suggestionsChipster.getByPlaceholder('Search technologies...')
    await expect(input).toBeVisible()
  })

  test('shows filtered suggestions when typing', async ({ page }) => {
    const suggestionsChipster = page.getByTestId('suggestions-chipster')
    const input = suggestionsChipster.getByPlaceholder('Search technologies...')
    
    await input.type('script')
    
    // Should show both JavaScript and TypeScript
    await expect(suggestionsChipster.getByText('JavaScript')).toBeVisible()
    await expect(suggestionsChipster.getByText('TypeScript')).toBeVisible()
    // Should not show React
    await expect(suggestionsChipster.getByText('React')).not.toBeVisible()
  })

  test('adds selected suggestion to the list', async ({ page }) => {
    const suggestionsChipster = page.getByTestId('suggestions-chipster')
    const input = suggestionsChipster.getByPlaceholder('Search technologies...')
    
    await input.type('java')
    
    // Click the suggestion
    const suggestion = suggestionsChipster.getByRole('option').filter({ hasText: 'JavaScript' })
    await suggestion.click()
    
    // Check if the item was added to the list (with icon)
    await expect(suggestionsChipster.getByText('🟨')).toBeVisible()
    await expect(suggestionsChipster.getByText('JavaScript')).toBeVisible()
    await expect(input).toHaveValue('')
  })

  test('displays suggestion icons', async ({ page }) => {
    const suggestionsChipster = page.getByTestId('suggestions-chipster')
    const input = suggestionsChipster.getByPlaceholder('Search technologies...')
    
    await input.type('type')
    
    await expect(suggestionsChipster.getByText('🔷')).toBeVisible()
    await expect(suggestionsChipster.getByText('TypeScript')).toBeVisible()
  })
})