import React from 'react';
import Helmet from 'react-helmet';

import Layout from 'components/Layout';
import Container from 'components/Container';

import Canvas from 'react-canvas-js'

const particleOptions = [
  {
    'maxParticles': 50,
    'colors': ['#2E1D62', '#513D91', '#487EEF', '#11A887', '#fc5c65', '#fed330'],
    'shapes': ['circle', 'square'],
    'size': 10,
    'minSpeed': 0.05,
    'maxSpeed': 0.20,
    'alpha': 0.70,
    'backgroundColor': '#1E1F29'
  }
]

const Statistics = () => {
  return (
    <Layout pageName="two">
      <Helmet>
        <title>COVID-19 REPORTS - Statistics</title>
      </Helmet>
      <Container type="content" className="text-center">
        <h1>Statistics</h1>
        <p>Soon...</p>
      </Container>
    </Layout>
  );
};

export default Statistics;
