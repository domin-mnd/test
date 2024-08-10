import { Skeleton } from '@/components/ui/Skeleton';
import { Pill } from '../Pill';

/**
 * Skeleton for table row
 * @returns Table row element with skeleton elements
 */
export function SkeletonRow() {
  return (
    <tr>
      <td>
        <Pill />
      </td>
      <td>
        <Skeleton width={250} height={20} />
      </td>
      <td>
        <Skeleton width={90} height={20} />
      </td>
      <td>
        <Skeleton width={70} height={20} />
      </td>
      <td>
        <Skeleton width={80} height={20} />
      </td>
      <td>
        <Skeleton width={110} height={20} />
      </td>
    </tr>
  );
}
