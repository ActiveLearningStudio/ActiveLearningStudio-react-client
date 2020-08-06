import React, { useEffect } from "react";

import "./../styles/App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Home from "./Home";
import "./../App.scss";
import { Helmet } from "react-helmet";

import AppRouter from "./../routers/AppRouter";

function App() {
  useEffect(() => {
    if (window.HubSpotConversations) {
      console.log("The api is ready already");
    } else {
      window.hsConversationsOnReady = [
        () => {
          console.log("Now the api is ready");
          window.HubSpotConversations.widget.load();
        },
      ];
    }
  }, []);
  return (
    <div>
      <Helmet>
        <meta name="description" content="CurrikiStudio" />
        <meta name="theme-color" content="#008f68" />
        <script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src={"//js.hs-scripts.com/" + process.env.REACT_APP_HUBSPOT + ".js"}
        ></script>
        ;
      </Helmet>

      <AppRouter />
    </div>
  );
}

export default App;
