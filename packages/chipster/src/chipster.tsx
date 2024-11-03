'use client'
import React from 'react'
import { ChipsterInput } from './ChipsterInput'
import { ChipsterSuggestions } from './ChipsterSuggestions'
import { ChipsterItem } from './ChipsterItem'
import { ChipsterValidation } from './ChipsterValidation'
import { ChipsterContext } from './ChipsterContext'
import styles from './chipster.module.css'
import { ChipsterProps, ChipsterItem as ChipsterItemType } from './types'
import { useChipster } from './ChipsterHook'
import { useChipsterContext } from './ChipsterContext'
import classNames from 'classnames'

interface ChipsterComposition {
  Input: typeof ChipsterInput
  Suggestions: typeof ChipsterSuggestions
  Item: typeof ChipsterItem
  ItemList: React.FC<{
    className?: string
    itemClassName?: string
    removeButtonClassName?: string
  }>
  Validation: typeof ChipsterValidation
}

export const Chipster: React.FC<ChipsterProps> & ChipsterComposition = ({ children, className, ...props }) => {
  const chipsterState = useChipster(props)
  const { error } = chipsterState

  return (
    <ChipsterContext.Provider value={chipsterState}>
      <div className={classNames(
        styles.container,
        className,
        { [styles.containerError]: error }
      )}>
        <div className={classNames(
          styles.inputContainer,
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

const ItemList: React.FC<{
  className?: string
  itemClassName?: string
  removeButtonClassName?: string
}> = ({ 
  className,
  itemClassName,
  removeButtonClassName
}) => {
  const { items, theme } = useChipsterContext()
  if (!items?.length) return null

  return (
    <div className={classNames(className)}>
      {items.map((item, index) => (
        <ChipsterItem
          key={item.id}
          item={item}
          index={index}
          className={classNames(
            styles.item,
            { [styles.itemDark]: theme === 'dark' },
            itemClassName
          )}
          removeButtonClassName={classNames(
            styles.itemRemove,
            { [styles.itemRemoveDark]: theme === 'dark' },
            removeButtonClassName
          )}
        />
      ))}
    </div>
  )
}

Chipster.Input = ChipsterInput
Chipster.Suggestions = ChipsterSuggestions
Chipster.Item = ChipsterItem
Chipster.ItemList = ItemList
Chipster.Validation = ChipsterValidation