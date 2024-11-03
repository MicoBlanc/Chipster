'use client'
import React from 'react'
import { ChipsterInput } from './ChipsterInput'
import { ChipsterSuggestions } from './ChipsterSuggestions'
import { ChipsterItem } from './ChipsterItem'
import { ChipsterValidation } from './ChipsterValidation'
import { ChipsterContext } from './ChipsterContext'
import styles from './chipster.module.css'
import { ChipsterProps } from './types'
import { useChipster } from './ChipsterHook'
import classNames from 'classnames'
import { ChipsterItemList } from './ChipsterItemList'

interface ChipsterComposition {
  Input: typeof ChipsterInput
  Suggestions: typeof ChipsterSuggestions
  Item: typeof ChipsterItem
  ItemList: typeof ChipsterItemList
  Validation: typeof ChipsterValidation
}

export const Chipster: React.FC<ChipsterProps> & ChipsterComposition = ({ 
  children, 
  className, 
  theme = 'light',
  ...props 
}) => {
  const chipsterState = useChipster({ theme, ...props })
  const { error } = chipsterState

  return (
    <ChipsterContext.Provider value={chipsterState}>
      <div className={classNames(
        styles.container,
        theme === 'dark' ? styles.containerDark : '',
        className,
        { [styles.containerError]: error }
      )}>
        <div className={classNames(
          styles.inputContainer,
          theme === 'dark' ? styles.inputContainerDark : '',
          { [styles.inputContainerError]: error }
        )}>
          {React.Children.map(children, child => {
            if (React.isValidElement(child) && 
                child.type !== ChipsterSuggestions && 
                child.type !== ChipsterValidation) {
              return child
            }
          })}
        </div>
        {React.Children.map(children, child => {
          if (React.isValidElement(child) && 
              (child.type === ChipsterSuggestions || 
               child.type === ChipsterValidation)) {
            return child
          }
        })}
      </div>
    </ChipsterContext.Provider>
  )
}

Chipster.Input = ChipsterInput
Chipster.Suggestions = ChipsterSuggestions
Chipster.Item = ChipsterItem
Chipster.ItemList = ChipsterItemList
Chipster.Validation = ChipsterValidation