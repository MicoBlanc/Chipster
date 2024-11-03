import React from 'react'
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
}) => {
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
    theme === 'dark' ? styles.itemDark : '',
    itemClassName,
    {
      [styles.itemHighlighted]: isHighlighted && theme === 'light',
      [styles.itemHighlightedDark]: isHighlighted && theme === 'dark',
      [styles.itemDisabled]: disabled,
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