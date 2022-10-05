import { DefaultSeo } from 'next-seo';
import { NextWebVitalsMetric } from 'next/app';
import { GlobalStyle } from '@styles/global-styles';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ResponsiveGlobal } from '@styles/responsive';
import React from 'react';
import { NextComponentType } from 'next';
import NextProgress from 'next-progress';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import createEmotionCache from '../utility/createEmotionCache';
import lightThemeOptions from '../styles/theme/lightThemeOptions';
import { wrapper } from '../store';
import { AuthProvider } from '../contexts/auth'

interface AppProps {
  Component: NextComponentType<any>;
  pageProps: any;
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);


const MyApp: React.FunctionComponent<AppProps> = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: AppProps) => {
  const router = useRouter();
  
  return (
    <>
      <Head>
        <meta
          id="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>
      <DefaultSeo
        title="Template Nextjsp"
        description="Nextjs"
        openGraph={{
          type: 'website',
          url: router.pathname,
          site_name: 'Template Nextjs',
          title: 'Template Nextjs',
          description: 'Nextjs',
        }}
      />
      <NextProgress
        color="#f9c10d"
        height="4px"
        options={{ showSpinner: true }}
      />
      <AuthProvider>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
            <GlobalStyle />
            <ResponsiveGlobal />
          </ThemeProvider>
        </CacheProvider>
      </AuthProvider>
    </>
  );
};

export function reportWebVitals({
  id,
  name,
  // startTime,
  value,
  label,
}: NextWebVitalsMetric) {
  if ((window as any).gtag)
    (window as any).gtag('send', 'event', {
      eventCategory:
        label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
      eventAction: name,
      eventValue: Math.round(name === 'CLS' ? value / 1000 : value), // values must be integers
      eventLabel: id, // id unique to current page load
      nonInteraction: true, // avoids affecting bounce rate.
    });
}

export default wrapper.withRedux(MyApp);
