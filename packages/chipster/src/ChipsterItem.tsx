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
    focusedItemIndex,
    setFocusedItemIndex,
    inputRef 
  } = useChipsterContext()

  const itemRef = useRef<HTMLSpanElement>(null)
  const isHighlighted = highlightedIndex === index
  const isFocused = focusedItemIndex === index

  useEffect(() => {
    if (isFocused && itemRef.current) {
      itemRef.current.focus()
    } else if (!isFocused && itemRef.current === document.activeElement) {
      inputRef.current?.focus()
    }
  }, [isFocused, inputRef])

  if (render) {
    return <>{render(item, isHighlighted)}</>
  }

  return (
    <span
      ref={itemRef}
      className={classNames(
        styles.item,
        theme === 'dark' ? styles.itemDark : '',
        {
          [styles.itemHighlighted]: isHighlighted && theme === 'light',
          [styles.itemHighlightedDark]: isHighlighted && theme === 'dark',
          [styles.itemDisabled]: disabled,
          [styles.itemFocused]: isFocused && theme === 'light',
          [styles.itemFocusedDark]: isFocused && theme === 'dark',
        },
        itemClassName,
        {
          [highlightedClassName || '']: isHighlighted,
          [disabledClassName || '']: disabled,
        }
      )}
      data-highlighted={isHighlighted || undefined}
      data-disabled={disabled || undefined}
      tabIndex={isFocused ? 0 : -1}
      role="button"
      aria-selected={isHighlighted}
      onFocus={() => {
        if (typeof index === 'number' && focusedItemIndex !== index) {
          setFocusedItemIndex(index)
        }
      }}
      onBlur={(e) => {
        if (!e.relatedTarget?.closest(`.${styles.item}`)) {
          setFocusedItemIndex(null)
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
  )
} 