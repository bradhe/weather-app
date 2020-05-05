import { combineReducers } from 'redux';

const weather = (state={}, action) => {
  switch (action.type) {
    default:
      return state;
  } 
};


export default combineReducers({
  weather: weather,
});
