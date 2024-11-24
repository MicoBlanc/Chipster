import React from 'react'
import { Chipster } from '../../Chipster'

export function BasicChipster() {
  return (
    <div data-testid="basic-chipster">
      <Chipster 
        mode='free'
        joiner={[',']}
      >
        <Chipster.ItemList animationDuration={200} />
        <Chipster.Input 
          placeholder="Add items"
        />
      </Chipster>
    </div>
  )
}