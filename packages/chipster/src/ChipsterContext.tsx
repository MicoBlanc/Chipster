import { createContext, useContext } from 'react'
import { ChipsterContextType } from './types'

export const ChipsterContext = createContext<ChipsterContextType | null>(null)

export const useChipsterContext = () => {
  const context = useContext(ChipsterContext)
  if (!context) {
    throw new Error('Chipster components must be used within a ChipsterProvider')
  }
  return context
}