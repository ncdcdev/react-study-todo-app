import React from 'react';
import { render } from 'react-dom';

const rootEl = document.getElementById('app');

render(<div>Hello, React</div>, rootEl);

if (module.hot) {
  module.hot.accept();
}
