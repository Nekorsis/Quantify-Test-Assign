// @flow

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';
import styles from './home.css';
import Header from './../../components/header/header';


function mapStateToProps(state) {
  return {
    events: state.appReducers.events,
    requestEvents: state.appReducers.requestEvents,
    isEventsRequestSucceeded: state.appReducers.isEventsRequestSucceeded,
    readAllEvents: state.appReducers.readAllEvents,
    deleteAllEvents: state.appReducers.deleteAllEvents,
    addEvent: state.appReducers.addEvent,
  };
}

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators({ ...actions }, dispatch) };
}

class Home extends React.Component {
  
  static propTypes = {
    events: React.PropTypes.object,
    requestEvents: React.PropTypes.func,
    isEventsRequestSucceeded: React.PropTypes.bool,
    readAllEvents: React.PropTypes.func,
    addEvent: React.PropTypes.func,
    deleteAllEvents: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      eventNameInput: '',
    }
  }
   onInputChange = e => {
    this.setState({
      eventNameInput: e.target.value,
    });
  }

  onButtonClick = () => {
    this.props.addEvent(this.state.eventNameInput);
    this.setState({
      eventNameInput: '',
    });
  }
  componentWillMount() {
    this.props.requestEvents();
  }

  componentDidMount() {
    const timerId = setInterval(() => {
      const randomName = Math.floor(Math.random() * (100 - 18) + 18);
      this.props.addEvent(`Random event name ${randomName}`);
    }, 10000);
  }
  render() {
    return (
      <div>
        {this.props.isEventsRequestSucceeded === true ?
          <div className={styles.homeContainer}>
            <Header events={this.props.events.events}/>
            <div className={styles.buttonsContainer}>
            <button className={styles.button} onClick={this.props.readAllEvents}>Пометить все события прочитанными</button>
            <button className={styles.button} onClick={this.props.deleteAllEvents}>Удалить все события</button>
            <input className={styles.input} placeholder={"Введите имя события ..."} type='text' value={this.state.eventNameInput} onChange={this.onInputChange}/>
            <button className={styles.button} onClick={this.onButtonClick}>Добавить событие</button>
            </div>
          </div> 
          : 
          <div>Wait for it ...</div>}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
