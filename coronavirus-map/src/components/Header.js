import React from 'react';
import { Link } from 'gatsby';

import Container from 'components/Container';

const Header = () => {
  return (
    <header>
      <Container type="content">
        <p>COVID-19 REPORTS</p>
        <ul>
          <li>
            <Link to="/">World map</Link>
          </li>
          <li>
            <Link to="/statistics/">Statistics</Link>
          </li>
        </ul>
      </Container>
    </header>
  );
};

export default Header;
