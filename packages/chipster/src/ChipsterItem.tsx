import React from 'react'
import styles from './chipster.module.css'
import classNames from 'classnames'
import { ChipsterItemProps } from './types'
import { useChipsterContext } from './ChipsterContext'

export const ChipsterItem = ({
  item,
  className,
  highlightedClassName,
  disabledClassName,
  iconClassName,
  removeButtonClassName,
  render,
  index,
}: ChipsterItemProps & { index?: number }) => {
  const { 
    removeItem, 
    highlightedIndex, 
    disabled, 
    theme 
  } = useChipsterContext()

  const isHighlighted = highlightedIndex === index

  if (render) {
    return render(item, isHighlighted)
  }

  const itemClasses = classNames(
    styles.item,
    className,
    {
      [styles.itemHighlighted]: isHighlighted && theme === 'light',
      [styles.itemHighlightedDark]: isHighlighted && theme === 'dark',
      [styles.itemDisabled]: disabled,
      [styles.itemDark]: theme === 'dark',
      [highlightedClassName || '']: isHighlighted,
      [disabledClassName || '']: disabled,
    }
  )

  return (
    <span
      className={itemClasses}
      data-highlighted={isHighlighted || undefined}
      data-disabled={disabled || undefined}
      tabIndex={isHighlighted ? 0 : -1}
      role="button"
      aria-selected={isHighlighted}
    >
      {item.icon && (
        <span className={classNames(styles.itemIcon, iconClassName)}>
          {item.icon}
        </span>
      )}
      {item.text}
      <button 
        onClick={() => removeItem(item.id)} 
        className={classNames(styles.itemRemove, removeButtonClassName)}
        disabled={disabled}
        tabIndex={-1}
        aria-label={`Remove ${item.text}`}
      >
        &times;
      </button>
    </span>
  )
} 