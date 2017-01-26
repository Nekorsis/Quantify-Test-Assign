import { combineReducers } from 'redux';
import { actionTypes as types } from './actionTypes';

const initialState = {
  isEventsRequestSend: false,
  isEventsRequestSucceeded: false,
  isEventsRequestFailed: false,
  events: {},
};

const filterEvents = (events) => {
    const eventsArray = events.events.map(event => ({
      ...event,
      unread: false,
    }));
    const result = {events: eventsArray}
    return result;
};

const addEvent = (events, eventName, eventId) => {
  const randomEvent = {
    id: eventId,
    title: eventName,
    unread: true,
    datetime: new Date().setDate((new Date()).getDate() - 1),
  }
  const newEvent = events.events;
  newEvent.push(randomEvent);
  const result = {events: newEvent};
  return result;
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
      isEventsRequestSucceeded: true,
    };
  case types.EVENTS_READ_ALL_EVENTS:
    return {
      ...state,
      events: filterEvents(state.events)
    }
  case types.EVENTS_DELETE_ALL_EVENTS:
    return {
      ...state,
      events: {events: [{}]}
    }
  case types.EVENTS_ADD_EVENT:
    return {
      ...state,
      events: addEvent(state.events, payload.eventName, state.events.events.length + 11),
    }
  default: return state;
  }
};

const reducers = combineReducers({ appReducers });
export default reducers;
