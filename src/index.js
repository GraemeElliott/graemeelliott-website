import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// eslint-disable-next-line no-unused-vars
import GA4React, { useGA4React } from 'ga-4-react';

const ga4react = new GA4React('G-856S4BKHJ3');

const root = ReactDOM.createRoot(document.getElementById('root'));

// see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

(async (_) => {
  await ga4react
    .initialize()
    .then((res) => console.log('Analytics Success.'))
    .catch((err) => console.log('Analytics Failure.'))
    .finally(() => {
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    });
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
