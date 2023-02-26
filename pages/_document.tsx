import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      
      <body>
        <Main />
        <NextScript />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="../TW-ELEMENTS-PATH/dist/js/index.min.js"></script>
      </body>
    </Html>
  )
}
