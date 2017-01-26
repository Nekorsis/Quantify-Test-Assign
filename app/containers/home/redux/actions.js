import { actionTypes as types } from './actionTypes';


const requestEvents = () => {
  return (dispatch) => {
    dispatch({ type: types.REQUEST_EVENTS });
    return fetch('http://localhost:3000/events')
      .then(response => {
        const data = response.json();
        return data;
      })
      .then(data => {
        dispatch({ type: types.REQUEST_EVENTS_SUCCSESS, payload: { events: data }});
      });
  };
};

const readAllEvents = () => {
  return { type: types.EVENTS_READ_ALL_EVENTS, payload: {} };
}

const deleteAllEvents = () => {
  return { type: types.EVENTS_DELETE_ALL_EVENTS, payload: {} };
}

const addEvent = eventName => {
  return { type: types.EVENTS_ADD_EVENT, payload: {eventName} };
}

export { requestEvents, readAllEvents, deleteAllEvents, addEvent };
