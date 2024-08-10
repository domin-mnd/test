import { Input } from '@/components/ui/Input';
import { useNumberMask } from '@/hooks/useNumberMask';
import { formatNumberMask, parseNumberMask } from '@/utils/numbers';
import {
  type MutableRefObject,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import styles from './Cell.module.sass';
import type { CellProps, CellRef } from './Cell.types';

/**
 * Interactive table cell with editable and non-editable states.
 * @param props Cell information along with the editable state
 * @returns Table cell element with input or span as interchangeable children
 */
export const Cell = forwardRef<CellRef, CellProps>(function Cell(
  { item, editable, type },
  ref,
) {
  const inputRef: MutableRefObject<HTMLInputElement | null> =
    useRef<HTMLInputElement>(null);
  const maskRef = useNumberMask();

  // biome-ignore lint/correctness/useExhaustiveDependencies: Reinitialize on item change
  const getPayload = useCallback(() => {
    const numberPayload =
      parseNumberMask(inputRef.current?.value) ??
      parseNumberMask(inputRef.current?.placeholder) ??
      0;

    const fallbackPayload =
      inputRef.current?.value || inputRef.current?.placeholder || '';

    const payloadValue =
      type === 'number' ? numberPayload : fallbackPayload;

    return payloadValue;
  }, [item, inputRef.current?.value]);

  useImperativeHandle(
    ref,
    () => {
      const payloadValue = getPayload();
      return {
        payloadValue,
        hasValue: !!inputRef.current?.value,
        clearPayload: () => {
          item = payloadValue;
          inputRef.current!.value = '';
        },
      };
    },
    [item, getPayload],
  );

  // Using data-hidden attribute similar to v-show vs v-if in vue due to the fact
  // that input is unmounted along with the given ref.
  return (
    <td className={styles.cell}>
      <Input
        ref={(element) => {
          inputRef.current = element;
          if (type === 'number') maskRef.current = element;
        }}
        placeholder={
          type === 'number'
            ? formatNumberMask(item as number)
            : (item as string) ?? ''
        }
        data-hidden={!editable}
      />
      <span data-hidden={editable}>
        {type === 'number'
          ? formatNumberMask(item as number)
          : item ?? ''}
      </span>
    </td>
  );
});
