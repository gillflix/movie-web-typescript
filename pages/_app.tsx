import '../styles/globals.css';
import { AppProps } from 'next/app';
import { ChakraProvider, extendTheme, useDisclosure } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import PlausibleProvider from 'next-plausible';
import { DefaultSeo } from 'next-seo';
import { ReviewModalContext } from '../utils/ModalContext';

const theme = extendTheme({
  colors: {
    brand: {
      300: `#A70000`,
    },
  },
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps): React.ReactChild {
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <>
      <DefaultSeo
        titleTemplate={'%s | SMDB'}
        description={'A private movie rating website'}
        openGraph={{
          title: `Gillflix`,
          type: `website`,
          site_name: `Gillflix`,
          images: [
            {
              url: `https://www.movie.michael-hall.me/sitePicture.png`,
              alt: `Profile Picture`,
            },
          ],
        }}
      />
      <PlausibleProvider
        domain="movie.michael-hall.me"
        selfHosted
        trackOutboundLinks
        enabled={process.env.NODE_ENV === 'production'}
        customDomain={'https://stats.michael-hall.me'}
      >
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <ReviewModalContext.Provider value={{ isOpen, onOpen, onClose }}>
              <Component {...pageProps} />
            </ReviewModalContext.Provider>
          </ChakraProvider>
        </QueryClientProvider>
      </PlausibleProvider>
    </>
  );
}

export default MyApp;
