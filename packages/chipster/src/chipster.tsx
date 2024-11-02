'use client'
import React from 'react'
import { ChipsterInput } from './ChipsterInput'
import { ChipsterSuggestions } from './ChipsterSuggestions'
import { ChipsterItem } from './ChipsterItem'
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
}

export const Chipster: React.FC<ChipsterProps> & ChipsterComposition = ({ children, className, ...props }) => {
  const chipsterState = useChipster(props)

  return (
    <ChipsterContext.Provider value={chipsterState}>
      <div className={classNames(styles.container, className)}>
        <div className={styles.inputContainer}>
          {React.Children.map(children, child => {
            if (React.isValidElement(child) && child.type !== ChipsterSuggestions) {
              return child
            }
          })}
        </div>
        {/* Render suggestions only if they are present outside the input container */}
        {React.Children.map(children, child => {
          if (React.isValidElement(child) && child.type === ChipsterSuggestions) {
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