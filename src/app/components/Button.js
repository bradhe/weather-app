import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import PropTypes from 'prop-types';

const getButtonType = (props) => {
  if (props.submit) {
    return 'submit';
  }

  return 'button';
}

const Button = (props) => {
  const className = classnames('btn', {
    'btn-primary': props.primary || props.submit,
    'btn-secondary': !(props.primary || props.submit),
    'font-weight-bold': true,
  });

  if (props.to) {
    return <Link className={className} to={props.to}>{props.children}</Link>
  } else {
    return <button className={className} type={getButtonType(props)} onClick={props.onClick}>{props.children}</button>
  }
};

Button.propTypes = {
  primary: PropTypes.bool,
  submit: PropTypes.bool,
};

export default Button
