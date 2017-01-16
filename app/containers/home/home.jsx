// @flow

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';
import styles from './home.css';
// var str: number = 'hello world!';

function mapStateToProps(state) {
  return {
    events: state.appReducers.events,
    requestEvents: state.appReducers.requestEvents,
  };
}

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators({ ...actions }, dispatch) };
}

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.requestEvents();
  }

  render() {
    return (
      <div className={styles.homeContainer + ' home-container'}>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
