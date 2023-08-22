import * as React from 'react';

import Container from '../components/Container';
import Hero from '../components/Hero';
import Layout from '../components/Layout/Layout';
import Quote from '../components/Quote';
import Title from '../components/Title';

import * as styles from './index.module.css';
import { navigate } from 'gatsby';

const IndexPage = () => {
  const goToBeats = () => {
    navigate('/beats');
  };

  return (
    <Layout disablePaddingBottom>
      {/* Hero Container */}
      <Hero
        maxWidth={'500px'}
        image={'/beatpad.jpg'}
        title={'Essentials for a cold winter'}
        subtitle={'Discover Autumn Winter 2021'}
        ctaText={'beats for sale'}
        ctaAction={goToBeats}
      />
      <small>Photo by Komarov Egor 🇺🇦 on Unsplash</small>
      {/* Quote */}
      <Quote
        bgColor={'var(--standard-light-grey)'}
        title={'about Birdy'}
        quote={
          'I believe in two things: the pursuit of quality in everything I do, and looking after one another. Everything else should take care of itself.”'
        }
      />
    </Layout>
  );
};

export default IndexPage;
