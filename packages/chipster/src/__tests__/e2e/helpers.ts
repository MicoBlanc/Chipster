import { Page, expect } from '@playwright/test'

const DEFAULT_TIMEOUT = 5000
const DEFAULT_PLACEHOLDER = 'Add items'

export async function addItem(page: Page, selector: string, text: string, placeholder?: string) {
  const container = page.getByTestId(selector)
  const input = container.getByPlaceholder(placeholder || DEFAULT_PLACEHOLDER)
  
  await expect(input).toBeVisible({ timeout: DEFAULT_TIMEOUT })
  await input.clear()
  await input.fill(text)
  await input.press('Enter')
  
  await expect(container.getByText(text)).toBeVisible({ timeout: DEFAULT_TIMEOUT })
}