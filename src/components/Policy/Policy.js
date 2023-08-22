import React from 'react';
import * as styles from './Policy.module.css';

const Policy = (props) => {
  return (
    <div className={styles.root}>
      <div className={styles.section}>
        <p>
          Birdy's Beats ("us", "we", or "our") operates the website located at
          www.birdysbeats.com (the "Website"). This page informs you of our
          policies regarding the collection, use, and disclosure of Personal
          Information we receive from users of the Website.
        </p>
      </div>
      <div className={styles.section}>
        <h3>Information Collection and Use</h3>
        <p>
          While using our Website, we may ask you to provide us with certain
          personally identifiable information that can be used to contact or
          identify you. Personally identifiable information may include, but is
          not limited to, your name, email address, and phone number ("Personal
          Information").
        </p>
      </div>
      <div className={styles.section}>
        <h3>Log Data</h3>
        <p>
          Like many site operators, we collect information that your browser
          sends whenever you visit our Website ("Log Data"). This Log Data may
          include information such as your computer's Internet Protocol ("IP")
          address, browser type, browser version, the pages of our Website that
          you visit, the time and date of your visit, the time spent on those
          pages, and other statistics.
        </p>
      </div>
      <div className={styles.section}>
        <h3>Cookies</h3>

        <p>
          Cookies are files with small amounts of data, which may include an
          anonymous unique identifier. Cookies are sent to your browser from a
          website and stored on your computer's hard drive.
        </p>
      </div>
      <div className={styles.section}>
        <h3>Security</h3>

        <p>
          The security of your Personal Information is important to us, but
          remember that no method of transmission over the Internet, or method
          of electronic storage, is 100% secure. While we strive to use
          commercially acceptable means to protect your Personal Information, we
          cannot guarantee its absolute security.
        </p>
      </div>
      <div className={styles.section}>
        <h3>Changes to This Privacy Policy</h3>

        <p>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page. You are
          advised to review this Privacy Policy periodically for any changes.
        </p>
      </div>
      <div className={styles.section}>
        <h3>Contact Us</h3>

        <p>
          If you have any questions about this Privacy Policy, please contact us
          at privacy@example.com.
        </p>

        <p>This Privacy Policy was last updated on August 22nd, 2023.</p>
      </div>
    </div>
  );
};

export default Policy;
