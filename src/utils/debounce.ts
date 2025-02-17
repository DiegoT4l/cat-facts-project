/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Creates a debounced function that delays invoking `func` until after `wait` milliseconds
 * have elapsed since the last time the debounced function was invoked.
 *
 * @template F - The type of the function to debounce.
 * @param {F} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @returns {F} - Returns the new debounced function.
 *
 * @example
 * const debouncedLog = debounce(() => console.log('Hello!'), 300);
 * debouncedLog(); // Logs 'Hello!' after 300ms.
 */
function debounce<F extends (...args: any[]) => any>(func: F, wait: number): F {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<F>) {
    const later = () => {
      timeout = null;
      func.apply(this, args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  } as F;
}

export default debounce;