import type { Link as ILink } from '@/utils/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './HeaderLink.module.sass';

/**
 * Header's link component. This component is used to render a link in the header.
 * @param link Link information
 * @returns Anchor element with specified href
 */
export function HeaderLink(link: ILink) {
  const router = useRouter();

  /**
   * We could memoize the callback using useCallback but it's a potential performance issue.
   * @see {@link https://habr.com/ru/companies/oleg-bunin/articles/749294}
   */
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    alert("This link won't work because it's a demo.");
  };

  return (
    <Link
      href={link.href}
      data-active={router.pathname === link.href}
      className={styles.link}
      onClick={handleClick}
    >
      {link.label}
    </Link>
  );
}
