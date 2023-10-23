import "@styles/globals.css";
import "@styles/Editor.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@contexts/themeContext";
import MyToastContainer from "@components/shared/MyToastContainer";
import PageSkeleton from "@components/PageSkeleton/PageSkeleton";
import CommonSEO from "@components/shared/CommonSEO";
import WithRouteChange from "@components/shared/WithRouteChange";
import WithCountVisitor from "@components/shared/WithCountVisitor";
import Header from "@components/Header";
import { ModalProvider } from "@contexts/modalContex";
import { Modals } from "@components/shared/Modals";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WithCountVisitor>
        <ThemeProvider>
          <Hydrate state={pageProps.dehydratedState}>
            <ModalProvider>
              <Header />
              <WithRouteChange
                routeChangeFallback={(url) => <PageSkeleton url={url} />}
              >
                <CommonSEO />
                <Component {...pageProps} />
                <Modals />
                <MyToastContainer />
                <ReactQueryDevtools initialIsOpen={false} />
              </WithRouteChange>
            </ModalProvider>
          </Hydrate>
        </ThemeProvider>
      </WithCountVisitor>
    </QueryClientProvider>
  );
}

export default MyApp;
