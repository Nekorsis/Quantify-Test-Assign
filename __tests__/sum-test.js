import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import fetch from 'isomorphic-fetch';

import * as actions from './../app/containers/home/redux/actions';
import { actionTypes as types } from './../app/containers/home/redux/actionTypes';
import rootReducer from './../app/containers/home/redux/reducers';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

// Test action creators
describe('test actions', () => {
  it('should create an action to request events from server', () => {
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
  describe('Should handle EVENTS_ADD_EVENT', () => {
    let state;
    
    state = {appReducers: {events: {
      events: [{
        id: 17,
        title: 'Test test test 17',
        unread: true,
        datetime: 123,
      }]
    }}};
    
    it('return new event to events object', () => {
      expect(rootReducer(state, {type: types.EVENTS_ADD_EVENT, payload: {events: state.events, eventName: 'test', eventId: 444}})).toEqual({appReducers: {events: {
      events: [
        { id: 17, title: 'Test test test 17', unread: true, datetime: 123, },
        { id: 12, title: 'test', unread: true, datetime: new Date().setDate((new Date()).getDate() - 1)}]
    }}});
    });
  });

  describe('Should hande REQUEST_EVENTS', () => {
    let state;

    state = {
      appReducers: { isEventsRequestSend: false, }
    };

    it('set vatiable isEventsRequestSend to true', () => {
      expect(rootReducer(state, {type: types.REQUEST_EVENTS, payload: {}})).toEqual({appReducers: { isEventsRequestSend: true}});
    });
  });

  describe('Should handle REQUEST_EVENTS_SUCCSESS', () => {
    let state;
    
    state = {appReducers: { events: {}, isEventsRequestSucceeded: false }};
    
    it('return new event to events object', () => {
      expect(rootReducer(state, {type: types.REQUEST_EVENTS_SUCCSESS, payload: { events : {events: [{id: 17, title: 'Test test test 17', unread: true, datetime: 123}] }} })).toEqual({appReducers: {events: {
      events: [
        { id: 17, title: 'Test test test 17', unread: true, datetime: 123, }]},
        isEventsRequestSucceeded: true,
      }});
    });
  });

  describe('Should handle EVENTS_READ_ALL_EVENTS', () => {
    let state;
    
    state = {appReducers: { events: {events: [{ id: 17, title: 'Test test test 17', unread: true, datetime: 123, }]}}};
    
    it('return new event to events object', () => {
      expect(rootReducer(state, {type: types.EVENTS_READ_ALL_EVENTS, payload: {} })).toEqual({appReducers: {events: {
      events: [
        { id: 17, title: 'Test test test 17', unread: false, datetime: 123, }]},
      }});
    });
  });
  describe('Should handle EVENTS_DELETE_ALL_EVENTS', () => {
    let state;
    
    state = {appReducers: { events: {events: [{ id: 17, title: 'Test test test 17', unread: true, datetime: 123, }]}}};
    
    it('return new event to events object', () => {
      expect(rootReducer(state, {type: types.EVENTS_DELETE_ALL_EVENTS, payload: {} })).toEqual({appReducers: {events: {events: [{}]},
      }});
    });
  });
});
