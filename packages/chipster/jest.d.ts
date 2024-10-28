import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toBeDisabled(): R;
      toHaveValue(value: string | number | string[]): R;
      toHaveLength(length: number): R;
      toBeVisible(): R;
      toHaveClass(className: string): R;
      toHaveAttribute(attr: string, value?: string): R;
    }
  }
}

// Extend expect
declare module '@jest/expect' {
  interface AsymmetricMatchers {
    toBeInTheDocument(): void;
    toHaveValue(value: string | number | string[]): void;
  }
}