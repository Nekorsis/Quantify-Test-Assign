import { combineReducers } from 'redux';
import { actionTypes as types } from './actionTypes';

const initialState = {
  isEventsRequestSend: false,
  events: {},
};

const appReducers = (state = initialState, { type, payload }) => {
  switch (type) {
  case types.REQUEST_EVENTS:
    return {
      ...state,
      isEventsRequestSend: true,
    };
  case types.REQUEST_EVENTS_SUCCSESS:
    return {
      ...state,
      events: payload.events,
    }
  default: return state;
  }
};

const reducers = combineReducers({ appReducers });
export default reducers;
