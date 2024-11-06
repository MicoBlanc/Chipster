import React from 'react'
import { Chipster } from '../../Chipster'

export function ItemListChipster() {
  return (
    <div data-testid="itemlist-chipster">
      <Chipster>
        <Chipster.ItemList 
          className="custom-list-class"
          itemClassName="custom-item-class"
          removeButtonClassName="custom-remove-button"
          removeIcon="×"
        />
        <Chipster.Input placeholder="Add list items" />
      </Chipster>
    </div>
  )
} 