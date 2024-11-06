import React from 'react'
import classNames from 'classnames'
import styles from './chipster.module.css'
import { ChipsterItem } from './ChipsterItem'
import { useChipsterContext } from './ChipsterContext'
import { ChipsterItemListProps } from './types'

export const ChipsterItemList: React.FC<ChipsterItemListProps> = ({ 
  className,
  itemClassName,
  removeButtonClassName,
  removeIcon,
  iconClassName
}) => {
  const { items, theme } = useChipsterContext()
  if (!items?.length) return null

  return (
    <div className={classNames(styles.itemList, className)}>
      {items.map((item, index) => (
        <ChipsterItem
          key={item.id}
          item={item}
          index={index}
          itemClassName={itemClassName}
          removeButtonClassName={removeButtonClassName}
          removeIcon={removeIcon}
          iconClassName={iconClassName}
        />
      ))}
    </div>
  )
} 