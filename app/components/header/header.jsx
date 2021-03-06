import React from 'react';
import styles from './header.css';

const Header = ({events}) => {
  console.log(events.length);
  const lastFiveEvents = events.slice(-5, events.length);
  const unreadEvents = events.filter((event) => {
    return event.unread === true ? event : null;
  });
  return (
      <div className={styles.headerContainer}>
        <div className={styles.headerCounter}>
          <span className={styles.qs}>
            {unreadEvents.length === 0 ? '' : unreadEvents.length}
            <span className={styles.popover}>{lastFiveEvents.map((event) => {
              const date = new Date (event.datetime);
              const stringDate = date.toString();
              return events.length != 1 ? <div className={styles.headerEventsList} key={event.id}>
                  <span className={styles.eventTitle}>{event.title}</span>
                  <span className={styles.eventTime}>{stringDate.slice(4, 10)}</span>
                </div> : <div>There is no events</div>
            })}</span>
          </span>
        </div>
      </div>
  );
};

Header.propTypes = {
  events: React.PropTypes.array,
};

export default Header;
