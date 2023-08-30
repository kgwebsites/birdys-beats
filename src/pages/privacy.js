import React from 'react';
import * as styles from './privacy.module.css';

import Banner from '../components/Banner';
import Policy from '../components/Policy';
import Layout from '../components/Layout';
import Container from '../components/Container';

const PrivacyPage = (props) => {
  return (
    <Layout disablePaddingBottom>
      <div className={styles.root}>
        <Banner
          maxWidth={'650px'}
          name="Privacy Policy"
          bgImage={'/support.png'}
          color={'var(--standard-white)'}
          height={'350px'}
        />
        <div className={styles.pageContainer}>
          <Container size={'large'} spacing={'min'}>
            <div>
              <Policy />
            </div>
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPage;
