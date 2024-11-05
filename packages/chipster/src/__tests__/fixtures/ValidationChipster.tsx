import React from 'react'
import { Chipster } from '../../Chipster'

export function ValidationChipster() {
  return (
    <div data-testid="validation-chipster">
      <Chipster>
        <Chipster.ItemList />
        <Chipster.Input placeholder="Add items" />
        <Chipster.Validation
          validationRules={[
            { test: (value) => value.length >= 3, message: 'Min 3 characters' }
          ]}
        />
      </Chipster>
    </div>
  )
}