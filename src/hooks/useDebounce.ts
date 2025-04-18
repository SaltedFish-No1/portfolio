// src/hooks/useDebounce.ts
import { useState, useEffect } from 'react'

/**
 * Returns a debounced value that only updates after the specified delay.
 *
 * @param value The input value to debounce
 * @param delay The debounce delay in milliseconds (default: 300ms)
 */
export default function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      window.clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
