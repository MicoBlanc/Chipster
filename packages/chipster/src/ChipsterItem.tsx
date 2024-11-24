import React, { useRef, useEffect } from 'react'
import styles from './chipster.module.css'
import classNames from 'classnames'
import { ChipsterItemProps } from './types'
import { useChipsterContext } from './ChipsterContext'

export const ChipsterItem = ({
  item,
  itemClassName,
  highlightedClassName,
  disabledClassName,
  iconClassName,
  removeButtonClassName,
  removeIcon,
  render,
  index,
}: ChipsterItemProps & { 
  index?: number
  removeIcon?: React.ReactNode
}): JSX.Element => {
  const { 
    highlightedIndex, 
    disabled, 
    theme,
    highlightItem,
    removeItem,
  } = useChipsterContext()

  const itemRef = useRef<HTMLSpanElement>(null)
  const isHighlighted = highlightedIndex === index

  // Focus management
  useEffect(() => {
    if (isHighlighted && itemRef.current) {
      itemRef.current.focus()
    }
  }, [isHighlighted])

  // Handle item removal
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent event bubbling
    if (typeof index === 'number') {     
      removeItem(item.id)
      // Clear highlight if we're removing the highlighted item
      if (index === highlightedIndex) {
        highlightItem(null)
      }
    }
  }

  return (
    <div className={styles.itemWrapper}>
      <span
        ref={itemRef}
        className={classNames(
          styles.item,
          theme === 'dark' ? styles.itemDark : '',
          {
            [styles.itemHighlighted]: isHighlighted && theme === 'light',
            [styles.itemHighlightedDark]: isHighlighted && theme === 'dark',
            [styles.itemDisabled]: disabled,
          },
          itemClassName,
          {
            [highlightedClassName || '']: isHighlighted,
            [disabledClassName || '']: disabled,
          }
        )}
        data-highlighted={isHighlighted || undefined}
        data-disabled={disabled || undefined}
        tabIndex={isHighlighted ? 0 : -1}
        role="button"
        aria-selected={isHighlighted}
        onFocus={() => {
          if (typeof index === 'number') {
            highlightItem(index)
          }
        }}
      >
        {item.icon && (
          <span className={classNames(
            styles.itemIcon,
            theme === 'dark' ? styles.itemIconDark : '',
            iconClassName
          )}>
            {item.icon}
          </span>
        )}
        {item.text}
        <button 
          onClick={handleRemove}
          className={classNames(
            styles.itemRemove,
            theme === 'dark' ? styles.itemRemoveDark : '',
            removeButtonClassName,
            'flex items-center justify-center'
          )}
          disabled={disabled}
          tabIndex={-1}
          aria-label={`Remove ${item.text}`}
        >
          {removeIcon || '×'}
        </button>
      </span>
    </div>
  )
} 