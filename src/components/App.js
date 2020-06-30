import React, { useEffect } from "react";

import "./../styles/App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Home from "./Home";
import "./../App.scss";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";
import AppRouter from "./../routers/AppRouter";
const trackingId = "UA-1841781-13";

function App() {
  useEffect(() => {
    ReactGA.initialize(trackingId, {
      debug: true,
    });
    ReactGA.pageview(window.location.pathname + window.location.search);
  });
  return (
    <div>
      <Helmet>
        <meta name="description" content="CurrikiStudio" />
        <meta name="theme-color" content="#008f68" />
      </Helmet>
      <AppRouter />
    </div>
  );
}

export default App;
