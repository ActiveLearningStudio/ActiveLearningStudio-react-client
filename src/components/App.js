import React from 'react';

import './../styles/App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Home from './Home'
import './../App.scss'


import AppRouter from './../routers/AppRouter'




function App() {
  return (
    <div>
        <AppRouter />
    </div>
  );
}

export default App;
