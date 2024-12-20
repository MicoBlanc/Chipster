import React, { useEffect } from 'react'
import classNames from 'classnames'
import styles from './chipster.module.css'
import { ChipsterValidationProps } from './types'
import { useChipsterContext } from './ChipsterContext'

export const ChipsterValidation = ({
  validationRules,
  maxItems,
  maxItemsMessage = 'Maximum items reached',
  allowDuplicates = true,
  transform,
  errorClassName,
  children,
  onError
}: ChipsterValidationProps): JSX.Element | null => {
  const { error, setValidationConfig, setError } = useChipsterContext()

  useEffect(() => {
    setValidationConfig({
      validationRules,
      maxItems,
      maxItemsMessage,
      allowDuplicates,
      transform,
      onError
    })

    return () => {
      setValidationConfig(null)
      setError(null)
    }
  }, [validationRules, maxItems, maxItemsMessage, allowDuplicates, transform, onError, setValidationConfig, setError])

  if (!error) return null

  if (children) {
    return <>{children(error)}</>
  }

  return (
    <div className={classNames(
      styles.error,
      'text-red-500 text-sm mt-1',
      errorClassName
    )}>
      {error}
    </div>
  )
} 