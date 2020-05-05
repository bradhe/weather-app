import React from 'react';

const renderConditions = (conditions) => {
  switch(conditions) {
  case "Clouds":
      return "☁️";
  };

  return conditions;
};

export default (props) => {
  return <span className="weather-conditions">{renderConditions(props.conditions)}</span>
};
