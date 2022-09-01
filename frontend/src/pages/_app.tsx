import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '@libs/material-ui/create-emotion-cache';
import theme from '@libs/material-ui/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import store from '@redux/store';
import '@styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CookiesProvider } from 'react-cookie';
import { Provider as ReduxProvider } from 'react-redux';
import { FirebaseAuthProvider } from 'src/providers/firebase-auth';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface AppPropsExtended extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}: AppPropsExtended) {
  return (
    <ReduxProvider store={store}>
      <FirebaseAuthProvider>
        <CookiesProvider>
          <CacheProvider value={emotionCache}>
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </CacheProvider>
        </CookiesProvider>
      </FirebaseAuthProvider>
    </ReduxProvider>
  );
}
