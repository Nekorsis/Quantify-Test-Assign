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


export { requestEvents };
