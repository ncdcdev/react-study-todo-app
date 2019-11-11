import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <h2>NotFound</h2>
    <ul>
      <li>
        <Link to="/">トップ</Link>
      </li>
    </ul>
  </div>
);

export default NotFound;
