import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../../styles/commonComponentsStyle/scrollToTop.module.css';

const SCROLL_BUTTON_VISIBILITY_POSITION = 300;

function ScrollToTop() {
  const [isVisible, setVisibility] = useState(false);

  const isScrollButtonVisible = () => {
    const scrollPosition = document.documentElement.scrollTop;
    if (scrollPosition > SCROLL_BUTTON_VISIBILITY_POSITION) {
      return setVisibility(true);
    }
    return setVisibility(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', isScrollButtonVisible);

  return (
    isVisible ? (
      <div className={styles.scrollToTop}>
        <Button variant="danger" size="sm" onClick={scrollToTop}>Scroll to top</Button>
      </div>
    ) : null
  );
}

export default ScrollToTop;
