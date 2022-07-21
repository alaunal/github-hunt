import { ToastContainer } from "react-toastify";
import { GithubProvider } from "../hooks/useGithub";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GithubProvider>
        <Component {...pageProps} />
      </GithubProvider>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default MyApp;
