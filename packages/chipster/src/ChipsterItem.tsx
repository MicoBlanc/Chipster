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
    removeItem, 
    highlightedIndex, 
    disabled, 
    theme,
    highlightItem,
    inputRef 
  } = useChipsterContext()

  const itemRef = useRef<HTMLSpanElement>(null)
  const isHighlighted = highlightedIndex === index
  console.log('isHighlighted', isHighlighted)
  console.log('index', index)

  // Focus management
  useEffect(() => {
    if (isHighlighted && itemRef.current) {
      itemRef.current.focus()
    }
  }, [isHighlighted])

  if (render) {
    return <>{render(item, isHighlighted)}</>
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
        tabIndex={isHighlighted ? 0 : -1} // Only allow focus when highlighted
        role="button"
        aria-selected={isHighlighted}
        onFocus={() => {
          if (typeof index === 'number') {
            highlightItem(index)
          }
        }}
        onBlur={(e) => {
          // Only remove highlight if we're not moving to another chip
          if (!e.relatedTarget?.closest(`.${styles.item}`)) {
            highlightItem(null)
          }
        }}
        onKeyDown={(e) => {
          // Handle keyboard events at the item level
          switch (e.key) {
            case 'Delete':
            case 'Backspace':
              e.preventDefault()
              removeItem(item.id)
              highlightItem(null)
              inputRef.current?.focus()
              break
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
          onClick={() => removeItem(item.id)} 
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