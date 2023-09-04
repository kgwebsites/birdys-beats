import React from 'react';
import * as styles from './thanks.module.css';

import Container from '../components/Container';
import Layout from '../components/Layout';

const ThanksPage = () => {
  return (
    <Layout disablePaddingBottom>
      <Container size={'medium'}>
        <div className={styles.root}>
          <h1>Thank you for your purchase!</h1>
          <h2>Please check your email to receive your products</h2>
        </div>
      </Container>
    </Layout>
  );
};

export default ThanksPage;
