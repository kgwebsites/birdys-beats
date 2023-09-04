import React, { useContext, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  LinkAuthenticationElement,
} from '@stripe/react-stripe-js';
import * as styles from './checkout.module.css';
import Container from '../components/Container';
import Layout from '../components/Layout/Layout';
import CartContext from '../context/CartProvider';
import Loader from '../../static/loader.svg';
import Button from '../components/Button/Button';

const stripe = loadStripe(process.env.GATSBY_STRIPE_PUBLIC);

// Customize the appearance of Elements using the Appearance API.
const appearance = {
  theme: 'flat',
  variables: {
    fontFamily: ' "Gill Sans", sans-serif',
    fontLineHeight: '1.5',
    borderRadius: '10px',
    colorBackground: '#F6F8FA',
    colorPrimaryText: '#262626',
  },
  rules: {
    '.Block': {
      backgroundColor: 'var(--colorBackground)',
      boxShadow: 'none',
      padding: '12px',
    },
    '.Input': {
      padding: '12px',
    },
    '.Input:disabled, .Input--invalid:disabled': {
      color: 'lightgray',
    },
    '.Tab': {
      padding: '10px 12px 8px 12px',
      border: 'none',
    },
    '.Tab:hover': {
      border: 'none',
      boxShadow:
        '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)',
    },
    '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
      border: 'none',
      backgroundColor: '#fff',
      boxShadow:
        '0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)',
    },
    '.Label': {
      fontWeight: '500',
    },
  },
};

// Enable the skeleton loader UI for the optimal loading experience.
const loader = 'auto';

function CheckoutForm() {
  return (
    <form>
      <h3>Contact info</h3>
      <LinkAuthenticationElement
        // Optional prop for prefilling customer information
        options={{
          defaultValues: {
            email: 'foo@bar.com',
          },
        }}
      />
      <h3>Payment</h3>
      <PaymentElement
        // Optional prop for prefilling customer information
        options={{
          defaultValues: {
            billingDetails: {
              name: 'John Doe',
              phone: '888-888-8888',
            },
          },
        }}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

const CheckoutPage = () => {
  const { getAll } = useContext(CartContext);
  const productIds =
    typeof getAll === 'function' ? getAll().map((product) => product.id) : [];
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const getPaymentIntentRes = async () => {
      try {
        const paymentIntentRes = await fetch('/api/createPaymentIntent', {
          method: 'POST',
          body: JSON.stringify({ productIds }),
        });
        const paymentIntentData = await paymentIntentRes.json();
        setClientSecret(paymentIntentData.secret);
      } catch (e) {
        console.error(e);
      }
    };
    getPaymentIntentRes();
  }, [productIds]);

  return (
    <Layout disablePaddingBottom>
      <Container size={'medium'}>
        <div className={styles.root}>
          {clientSecret ? (
            <Elements
              stripe={stripe}
              options={{ clientSecret, appearance, loader }}
            >
              <CheckoutForm />
            </Elements>
          ) : (
            <div class={styles.center}>
              <Loader />
            </div>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default CheckoutPage;
