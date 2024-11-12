import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import 'katex/dist/katex.min.css';

// Initialize Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export const metadata: Metadata = {
  title: 'The Unicorn Ratio - Portfolio Construction Calculator',
  description:
    'Calculate how many startups to invest in for optimal portfolio construction. Uses Kelly Criterion and Binomial Probability to analyze investment strategies.',
  keywords:
    'startup investing, portfolio construction, Kelly Criterion, unicorn investing, YC batch, angel investing, venture capital',
  openGraph: {
    title: 'The Unicorn Ratio - Portfolio Construction Calculator',
    description:
      'Calculate how many startups to invest in for optimal portfolio construction. Uses Kelly Criterion and Binomial Probability to analyze investment strategies.',
    type: 'website',
    url: 'https://unicornratio.orangecollective.vc',
    images: [
      {
        url: '/UnicornRatioByOrangeCollective.png',
        width: 1200,
        height: 630,
        alt: 'The Unicorn Ratio by Orange Collective',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Unicorn Ratio - Portfolio Construction Calculator',
    description:
      'Calculate how many startups to invest in for optimal portfolio construction. Uses Kelly Criterion and Binomial Probability to analyze investment strategies.',
    images: ['/UnicornRatioByOrangeCollective.png'],
  },
  authors: [{ name: 'Orange Collective', url: 'https://orangecollective.vc' }],
  creator: 'Orange Collective',
  publisher: 'Orange Collective',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </head>
      <body
        className={`${inter.className} bg-zinc-50 dark:bg-zinc-900 transition-colors duration-150`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
