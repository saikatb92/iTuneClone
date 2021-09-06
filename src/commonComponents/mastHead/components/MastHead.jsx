import React from 'react';
import { Badge, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../../../styles/commonComponentsStyle/mastHead.module.css';

const MAIN_PAGE = '/top-100-albums';
const FAVORITES_PAGE = '/Favorites';

const LEFT_TAG = 'Music';
const RIGHT_TAG = 'Favorites';

function MastHead() {
  return (
    <div className={styles.general}>
      <Navbar bg="dark">
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link className={styles.homeIcon} to={MAIN_PAGE}>
              {LEFT_TAG}
            </Link>
          </Nav>
          <Nav>
            <Link to={FAVORITES_PAGE}>
              <h4>
                <Badge pill className="h-3" variant="danger">{RIGHT_TAG}</Badge>
              </h4>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default MastHead;
