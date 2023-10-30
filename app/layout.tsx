'use client';

import { Navigation, Layout, Footer } from 'features/common/layout';

import { Fonts } from 'styles/fonts';

import { Providers } from 'providers';

const RootLayout = function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="manifest.json" />
        <link
          rel="shortcut icon"
          href="/icons/favicon.ico"
          type="image/x-icon"
        />
        <title>Auditor board</title>
        <Fonts />
      </head>
      <body>
        <Providers>
          <Layout>
            <Navigation />
            {children}
            <Footer />
          </Layout>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
