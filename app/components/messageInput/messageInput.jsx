import React from 'react';
import styles from './messageInput.css';

const MessageInput = ({something}) => {
  return (
      <div className={styles.messageInputContainer}>
        <input name='message' className={styles.messageInput} type='text'/>
      </div>
  );
};

MessageInput.propTypes= {
};

export default MessageInput;
