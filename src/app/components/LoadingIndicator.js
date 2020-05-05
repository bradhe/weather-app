import React from 'react';
import classnames from 'classnames';

export default (props) => {
  const { children } = props;
  const className = classnames(
    'spinner-border',
    'text-primary',
    'm-5',
    'triplog-loading-indicator'
  );

  return (<div className={className} role="status"><span className="sr-only">{children}</span></div>);
};
