import React from 'react'
import { Chipster } from '../../Chipster'

export function InputChipster() {
  return (
    <div data-testid="input-chipster">
      <Chipster>
        <Chipster.Input 
          placeholder="Custom placeholder"
          className="custom-input-class"
          onInputChange={(value) => console.log('Input changed:', value)}
        />
      </Chipster>
    </div>
  )
} 