import React from 'react'
import { Chipster } from '../../Chipster'

export function BasicChipster() {
  return (
    <div data-testid="basic-chipster">
      <Chipster>
        <Chipster.ItemList />
        <Chipster.Input placeholder="Add items" />
      </Chipster>
    </div>
  )
}