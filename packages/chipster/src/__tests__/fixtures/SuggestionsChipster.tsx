import React from 'react'
import { Chipster } from '../../Chipster'

const suggestions = [
  { label: 'JavaScript', icon: '🟨' },
  { label: 'TypeScript', icon: '🔷' },
  { label: 'React', icon: '⚛️' }
]

export function SuggestionsChipster() {
  return (
    <div data-testid="suggestions-chipster">
      <Chipster theme='dark' mode="suggestions-only">
        <Chipster.ItemList />
        <Chipster.Input placeholder="Search technologies..." />
        <Chipster.Suggestions 
          getSuggestions={(input) => 
            suggestions.filter(s => 
              s.label.toLowerCase().includes(input.toLowerCase())
            )
          }
        />
      </Chipster>
    </div>
  )
}