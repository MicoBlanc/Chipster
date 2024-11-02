import React, { useEffect } from 'react'
import classNames from 'classnames'
import styles from './chipster.module.css'
import { ChipsterValidationProps } from './types'
import { useChipsterContext } from './ChipsterContext'

export const ChipsterValidation: React.FC<ChipsterValidationProps> = ({
  validationRules,
  maxItems,
  maxItemsMessage,
  allowDuplicates,
  transform,
  className,
  errorClassName,
  children,
  onError
}) => {
  const { error, setValidationConfig } = useChipsterContext()

  useEffect(() => {
    setValidationConfig({
      validationRules,
      maxItems,
      maxItemsMessage,
      allowDuplicates,
      transform,
      onError
    })

    return () => setValidationConfig(null)
  }, [validationRules, maxItems, maxItemsMessage, allowDuplicates, transform, onError])

  useEffect(() => {
    if (error && onError) {
      onError(error)
    }
  }, [error, onError])

  if (!error) return null

  if (children) {
    return children(error)
  }

  return (
    <div className={classNames(styles.error, errorClassName)}>
      {error}
    </div>
  )
} 