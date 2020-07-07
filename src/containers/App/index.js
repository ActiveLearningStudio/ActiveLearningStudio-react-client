import React from 'react';
import { Helmet } from 'react-helmet';

import AppRouter from 'routers/AppRouter';

import './style.scss';

function App() {
  return (
    <div>
      <Helmet>
        <meta name="description" content="CurrikiStudio" />
        <meta name="theme-color" content="#008f68" />
      </Helmet>

      <div className="need_help">Need Help ?</div>

      <AppRouter />
    </div>
  );
}

export default App;
