import * as React from 'react';

import Layout from '../../components/Layout';
import BeatRoll from '../../components/BeatRoll';

export default class BeatsIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <BeatRoll />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
