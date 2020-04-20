import React from 'react';

import './../styles/App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Home from './Home'
import './../App.scss'


import AppRouter from './../routers/AppRouter'


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import BookList from './BookList';

import { createStore } from 'redux'

const client = new ApolloClient({
  uri: 'http://localhost:8101/graphql'
});

function App() {
  return (
    <div>
        <AppRouter />
    </div>
  );
}

export default App;
