import { forwardRef } from 'react';
import styles from './Input.module.sass';
import type { InputProps } from './Input.types';

/**
 * Styled input component with ref
 * @returns Styled input element
 */
// Use named function for better stack traces
export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    return <input className={styles.input} {...props} ref={ref} />;
  },
);
