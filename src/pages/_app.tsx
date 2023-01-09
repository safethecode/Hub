import type { AppProps } from 'next/app';
import { globalStyles } from 'styles/globalStyles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

function App({ Component, pageProps }: AppProps) {
  // Global styles defined in `styles/globalStyles.ts`
  globalStyles();

  // Create a QueryClient
  // https://react-query-v3.tanstack.com/quick-start
  const queryClient = new QueryClient();
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
export default App;
