import React from 'react'
import classNames from 'classnames'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styles from './chipster.module.css'
import animationStyles from './chipsterAnimations.module.css'
import { ChipsterItem } from './ChipsterItem'
import { useChipsterContext } from './ChipsterContext'
import { ChipsterItemListProps } from './types'

export const ChipsterItemList: React.FC<ChipsterItemListProps> = ({ 
  className,
  itemClassName,
  removeButtonClassName,
  removeIcon,
  iconClassName,
  animationDuration = 200
}) => {
  const { items } = useChipsterContext()
  if (!items?.length) return null

  return (
    <div className={classNames(styles.itemList, className)}>
      <TransitionGroup component={null}>
        {items.map((item, index) => (
          <CSSTransition
            key={item.id}
            timeout={animationDuration}
            classNames={{
              enter: animationStyles['chipEnter'],
              enterActive: animationStyles['chipEnterActive'],
              exit: animationStyles['chipExit'],
              exitActive: animationStyles['chipExitActive']
            }}
            appear={true}
            unmountOnExit
          >
            <ChipsterItem
              item={item}
              index={index}
              itemClassName={itemClassName}
              removeButtonClassName={removeButtonClassName}
              removeIcon={removeIcon}
              iconClassName={iconClassName}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  )
} 