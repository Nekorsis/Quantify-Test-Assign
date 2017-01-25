import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import fetch from 'isomorphic-fetch';

import * as actions from './../app/containers/home/redux/actions';
import { actionTypes as types } from './../app/containers/home/redux/actionTypes';
import rootReducer from './../app/containers/home/redux/reducers';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const mockEvents = [{
  id: 17,
  title: 'Test test test 17',
  unread: true,
  datetime: new Date(),
}];

// Test action creators
describe('test actions', () => {
  /*
  it('should create an action to request events from server', () => {

     nock('http://localhost:3000/')
      .get('/events')
      .reply(200, { body: { mockEvents }});

    const expectedActions = [
      {type: types.REQUEST_EVENTS},
      {type: types.REQUEST_EVENTS_SUCCSESS, payload: {events: mockEvents}}
    ];

    const store = mockStore({ events: {} });
    
    return store.dispatch(actions.requestEvents())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });
  */
  it('should call EVENTS_READ_ALL_EVENTS action', () => {
    const expectedAction = {type: types.EVENTS_READ_ALL_EVENTS, payload: {}};
     
    expect(actions.readAllEvents()).toEqual(expectedAction);
  });

  it('should call EVENTS_DELETE_ALL_EVENTS action', () => {
    const expectedAction = {type: types.EVENTS_DELETE_ALL_EVENTS, payload: {}};
     
    expect(actions.deleteAllEvents()).toEqual(expectedAction);
  });

  it('should call EVENTS_ADD_EVENT action', () => {
    const expectedAction = {type: types.EVENTS_ADD_EVENT, payload: {}};
     
    expect(actions.addEvent()).toEqual(expectedAction);
  });
});

describe('test reducer', () => {

  it('should handle REQUEST_EVENTS', () => {
    expect(
      rootReducer([], {
        type: types.REQUEST_EVENTS,
        isEventsRequestSend: false
      })
    ).toEqual(
      {"appReducers": {"events": {}, "isEventsRequestFailed": false, "isEventsRequestSend": true, "isEventsRequestSucceeded": false}}
    )
  });

  /*
  it('should handle REQUEST_EVENTS_SUCCSESS', () => {
    expect(
      rootReducer([], {
        type: types.REQUEST_EVENTS_SUCCSESS,
        isEventsRequestSucceeded: false,
      })
    ).toEqual(
      {"appReducers": {"events": {}, "isEventsRequestFailed": false, "isEventsRequestSend": false, "isEventsRequestSucceeded": true}}
    )
  });
  */
  it('should handle EQUEST_EVENTS_SUCCSESS', () => {
    expect(
      rootReducer([], {
        type: types.EQUEST_EVENTS_SUCCSESS,
        isEventsRequestSucceeded: false,
        events: {},
      })
    ).toEqual(
      {"appReducers": {"events": {}, "isEventsRequestFailed": false, "isEventsRequestSend": false, "isEventsRequestSucceeded": false}}
    )
  });
})