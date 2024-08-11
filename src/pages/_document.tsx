import { META_DESCRIPTION, TITLE } from '@/utils/constants';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <title>{TITLE}</title>
        <meta name='description' content={META_DESCRIPTION} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
