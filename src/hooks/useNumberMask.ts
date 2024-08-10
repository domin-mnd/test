import {
  type MutableRefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react';

export interface UseNumberMaskOptions {
  allowDecimal?: boolean;
}

/**
 * Simple number mask for input element.
 * Groups by 3 digits. Replaces '.' with ','. Limits to 14 characters.
 * @returns Ref object for input element
 */
export function useNumberMask(options?: UseNumberMaskOptions) {
  const ref: MutableRefObject<HTMLInputElement | null> =
    useRef<HTMLInputElement>(null);

  // using useCallback to not pollute useEffect scope.
  const handleInput = useCallback(
    (event: Event) => {
      const target = event.target as HTMLInputElement;

      // Replace non-digit characters with empty string,
      // essentially leaving only numbers and commas.
      let value = target.value
        .substring(0, 14)
        .replace('.', ',')
        .replace(',', (substring: string, i: number, text: string) =>
          text.indexOf(substring) === i ? ',' : '',
        )
        .replace(/[^\d,]/g, '');

      if (!options?.allowDecimal) value = value.replace(/\D/g, '');

      // Separate by 3 digits in groups
      // E.g.: 1200000,5 -> 1 200 000,5
      const [integer, decimal] = value.split(',');
      const integerFormatted = integer.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ' ',
      );

      target.value =
        decimal !== undefined
          ? `${integerFormatted},${decimal}`
          : integerFormatted;
    },
    [options?.allowDecimal],
  );

  const handleDisallowedKeys = useCallback((event: KeyboardEvent) => {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.addEventListener('keydown', handleDisallowedKeys);
    ref.current.addEventListener('input', handleInput);

    return () => {
      ref.current?.removeEventListener(
        'keydown',
        handleDisallowedKeys,
      );
      ref.current?.removeEventListener('input', handleInput);
    };
  }, [handleInput, handleDisallowedKeys]);

  return ref;
}
