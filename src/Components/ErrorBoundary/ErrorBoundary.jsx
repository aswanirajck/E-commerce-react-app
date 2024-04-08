import React from 'react';

const ErrorBoundary = ({ error, children }) => {
  if (error) {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
      </div>
    );
  }
  return children;
};

export default ErrorBoundary;