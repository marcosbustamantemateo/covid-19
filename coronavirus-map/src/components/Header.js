import React from 'react';
import { Link } from 'gatsby';

import Container from 'components/Container';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  return (
    <header>
      <Container type="content">
        <p>COVID-19 REPORTS</p>

        <input type="checkbox" id="overlay-input" />
        <label htmlFor="overlay-input" id="overlay-button"><span></span></label>
        <div id="overlay">
          <ul>
            <Link to="/"><li><FontAwesomeIcon icon={faGlobeEurope} /> WORLD MAP</li></Link>
            <Link to="/details/"><li><FontAwesomeIcon icon={faInfoCircle} /> DETAILS</li></Link>
          </ul>
        </div>
      </Container>
    </header>
  );
};

export default Header;
