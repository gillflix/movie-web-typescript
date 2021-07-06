import '../styles/globals.css';
import { AppProps } from 'next/app';
import { ChakraProvider, extendTheme, useDisclosure } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
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
        titleTemplate={'%s | Gillflix'}
        description={'A movie rating website'}
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
      
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <ReviewModalContext.Provider value={{ isOpen, onOpen, onClose }}>
              <Component {...pageProps} />
            </ReviewModalContext.Provider>
          </ChakraProvider>
        </QueryClientProvider>
    </>
  );
}

export default MyApp;
