import React from 'react';
import * as styles from './contact.module.css';

import Banner from '../../components/Banner';
import Contact from '../../components/Contact';
import Layout from '../../components/Layout';
import Container from '../../components/Container';

const ContactPage = (props) => {
  return (
    <Layout disablePaddingBottom>
      <div className={styles.root}>
        <Banner
          maxWidth={'650px'}
          name="Contact Us"
          bgImage={'/support.png'}
          color={'var(--standard-white)'}
          height={'350px'}
        />
        <div className={styles.pageContainer}>
          <Container size={'large'} spacing={'min'}>
            <div className={`${styles.content}`}>
              <Contact />
            </div>
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
