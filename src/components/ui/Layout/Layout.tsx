import { Header } from '@/components/ui/Header';
import { Main } from '@/components/ui/Main';
import { Navbar } from '@/components/ui/Navbar';
import { TabsProvider } from '@/context/tabsContext';
import { HEADER_LINKS, HEADER_PROJECT } from '@/utils/constants';
import { Roboto } from 'next/font/google';
import styles from './Layout.module.sass';
import type { LayoutProps } from './Layout.types';

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
});

/**
 * Layout component with Header, Navbar and Main components used within it.
 * @param props <Component {...pageProps} />
 * @returns Globally styled layout
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className={roboto.className}>
      <TabsProvider>
        <Header links={HEADER_LINKS} project={HEADER_PROJECT} />
        <div className={styles.wrapper}>
          <Navbar />
          <Main>{children}</Main>
        </div>
      </TabsProvider>
    </div>
  );
}
