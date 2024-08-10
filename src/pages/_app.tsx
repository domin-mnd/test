import { Layout } from '@/components/ui/Layout';
import type { AppProps } from 'next/app';
// Global styles can't be imported anywhere but in _app.tsx
import '@/styles/global.sass';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
