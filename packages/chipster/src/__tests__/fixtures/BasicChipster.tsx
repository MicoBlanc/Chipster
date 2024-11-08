import React from 'react'
import { Chipster } from '../../Chipster'

export function BasicChipster() {
  return (
    <div data-testid="basic-chipster">
      <Chipster mode='free'>
        <Chipster.ItemList />
        <Chipster.Input placeholder="Add items" />
      </Chipster>
    </div>
  )
}