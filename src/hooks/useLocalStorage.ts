import { useState, useEffect, useCallback } from 'react';
import debounce from '@/utils/debounce';

/**
 * Custom hook to manage state synchronized with localStorage.
 *
 * @template T - The type of the value to be stored.
 * @param {string} key - The key under which the value is stored in localStorage.
 * @param {T} initialValue - The initial value to be used if there is no value in localStorage.
 * @param {number} [delay=300] - The delay in milliseconds for debouncing updates to localStorage.
 * @returns {[T, (value: T | ((val: T) => T)) => void]} - Returns a stateful value and a function to update it.
 *
 * @example
 * const [name, setName] = useLocalStorage<string>('name', 'John Doe');
 */
function useLocalStorage<T>(key: string, initialValue: T, delay: number = 300): [T, (value: T | ((val: T) => T)) => void] {
  // Local state to store the value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(
        `Error getting value from localStorage for key '${key}':`,
        error
      );
      return initialValue;
    }
  });

  // Update the value in localStorage and in the state
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setValue = useCallback(
    debounce((value: T | ((val: T) => T)) => {
      if (typeof window === 'undefined') {
        console.warn(
          `Cannot set value in localStorage for key '${key}' because window is not defined.`
        );
        return;
      }

      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // Prevent unnecessary updates
        if (valueToStore === storedValue) return;

        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(
          `Error setting value in localStorage for key '${key}':`,
          error
        );
      }
    }, delay),
    [key, storedValue, delay]
  );

  // Load the value from localStorage when the key changes
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        try {
          const newValue = event.newValue
            ? JSON.parse(event.newValue)
            : initialValue;
          setStoredValue(newValue);
        } catch (error) {
          console.error(
            `Error parsing new value from localStorage for key '${key}':`,
            error
          );
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setValue] as const;
}

export default useLocalStorage;