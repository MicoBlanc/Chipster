import React from 'react'
import { createRoot } from 'react-dom/client'
import { BasicChipster } from '../__tests__/fixtures/BasicChipster'
import { ValidationChipster } from '../__tests__/fixtures/ValidationChipster'
import { SuggestionsChipster } from '../__tests__/fixtures/SuggestionsChipster'
import { InputChipster } from '../__tests__/fixtures/InputChipster'
import { ItemListChipster } from '../__tests__/fixtures/ItemListChipster'

const root = createRoot(document.getElementById('root')!)
root.render(
  <div>
    <BasicChipster />
    <ValidationChipster />
    <SuggestionsChipster />
    <InputChipster />
    <ItemListChipster />
  </div>
)