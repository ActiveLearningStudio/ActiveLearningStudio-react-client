import React from "react";

import "./../styles/App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Home from "./Home";
import "./../App.scss";
import { Helmet } from "react-helmet";

import AppRouter from "./../routers/AppRouter";

function App() {
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
