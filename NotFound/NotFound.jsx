import React from 'react';

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! It seems like the page you're looking is taking time to load</p>
      <a href="/">Go to Homepage</a>
    </div>
  );
}

export default NotFound;