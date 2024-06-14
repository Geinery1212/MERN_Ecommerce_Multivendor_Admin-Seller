import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/Reducers';
const App = lazy(() => import('./App'));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    {/* 
    The reason Suspense wraps around App is because App is loaded asynchronously. This means it may take some time to load. Suspense allows us to display a spinner or other fallback content while waiting for App to load.
     */}
    <Provider store={store}>
      <Suspense fallback={<h1>Loading...</h1>}>
        <App />
      </Suspense>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
