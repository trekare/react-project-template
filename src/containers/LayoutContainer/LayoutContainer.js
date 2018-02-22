import React from 'react';

import styles from './LayoutContainer.css';

class LayoutContainer extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <p className={styles.content}>
          This is an empty page
        </p>
      </div>
    );
  }
}

export default LayoutContainer;
