import React from 'react';
import { render } from 'react-dom';
import App from './pages/App';

const rootEl = document.getElementById('app');

render(<App />, rootEl);

if (module.hot) {
  module.hot.accept();
}
