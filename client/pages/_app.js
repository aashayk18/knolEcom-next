import Head from "next/head";
import Script from "next/script";
import "@/styles/globals.css";
import { ThemeProvider } from "../contexts/ThemeContext";
import Navbar from "../components/Navbar/Navbar.jsx";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"
      ></Script>
    </ThemeProvider>
  );
}

export default MyApp;
