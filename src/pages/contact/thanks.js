import React from 'react';
import * as styles from './thanks.module.css';

import Container from '../../components/Container';
import Layout from '../../components/Layout';

const ContactThanksPage = () => {
  return (
    <Layout disablePaddingBottom>
      <Container size={'medium'}>
        <div className={styles.root}>
          <h2>Thanks for your message!</h2>
          <p>We'll get back to you as soon as we can</p>
        </div>
      </Container>
    </Layout>
  );
};

export default ContactThanksPage;
