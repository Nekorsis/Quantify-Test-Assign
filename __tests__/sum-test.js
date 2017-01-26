import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import fetch from 'isomorphic-fetch';
import { actionTest, asyncReducerTest, reducerTest } from 'redux-jest';

import * as actions from './../app/containers/home/redux/actions';
import { actionTypes as types } from './../app/containers/home/redux/actionTypes';
import rootReducer from './../app/containers/home/redux/reducers';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

const events = [{
  id: 17,
  title: 'Test test test 17',
  unread: true,
  datetime: 123,
}];

const store = mockStore({
  isEventsRequestSend: false,
  isEventsRequestSucceeded: false,
  isEventsRequestFailed: false,
  events: {}, 
});

const filledStore = mockStore({
  isEventsRequestSend: false,
  isEventsRequestSucceeded: false,
  isEventsRequestFailed: false,
  events: {events: [{
    id: 17,
    title: 'Test test test 17',
    unread: true,
    datetime: 123,    
  }]}, 
});

const filledStoreRead = mockStore({
  isEventsRequestSend: false,
  isEventsRequestSucceeded: false,
  isEventsRequestFailed: false,
  events: {events: [{
    id: 17,
    title: 'Test test test 17',
    unread: false,
    datetime: 123,    
  }]}, 
});

// Test action creators
describe('test actions', () => {
  it('should create an action to request events from server', () => {

     nock('http://localhost:3000/')
      .get('/events')
      .reply(200, { events });
      
    const localEvents = {events: [{
      id: 17,
      title: 'Test test test 17',
      unread: true,
      datetime: 123,
    }]};

    const expectedActions = [
      {type: types.REQUEST_EVENTS},
      {type: types.REQUEST_EVENTS_SUCCSESS, payload:{ events: localEvents }}
    ];

    return store.dispatch(actions.requestEvents())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

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

// Test reducer
describe('Testing reducer', () => {
  reducerTest('this should handle REQUEST_EVENTS reducer', rootReducer, store, {type: types.REQUEST_EVENTS, payload: {}}, {
    appReducers: {
      isEventsRequestSend: true,
      isEventsRequestSucceeded: false,
      isEventsRequestFailed: false,
      events: {},
    }}
  );

  reducerTest('this should handle REQUEST_EVENTS_SUCCSESS reducer', rootReducer, store, {type: types.REQUEST_EVENTS_SUCCSESS, payload: {events}}, {appReducers: {
    isEventsRequestSend: false,
    isEventsRequestSucceeded: true,
    isEventsRequestFailed: false,
    events: events, // ?????????
  }});  
  
  reducerTest('this shoud handle EVENTS_READ_ALL_EVENTS', 
    rootReducer, 
    {events: {events: [{id: 17, title: 'Test test test 17', unread: true, datetime: 123}]}}, 
    {type: types.EVENTS_READ_ALL_EVENTS, payload: {}}, 
    {events: {events: [{id: 17, title: 'Test test test 17', unread: false, datetime: 123}]}});
});
