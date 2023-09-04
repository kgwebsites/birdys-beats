import React, { useContext, useEffect, useState } from 'react';
import * as styles from './accountSuccess.module.css';
import Container from '../components/Container';
import Layout from '../components/Layout/Layout';
import CartContext from '../context/CartProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';

const stripe = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

// Customize the appearance of Elements using the Appearance API.
const appearance = {
  /* ... */
};

// Enable the skeleton loader UI for the optimal loading experience.
const loader = 'auto';

function CheckoutForm() {
  return (
    <form>
      <h3>Contact info</h3>
      <linkAuthenticationElement
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
      ;<button type="submit">Submit</button>
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
      const paymentIntentRes = await fetch('/api/createPaymentIntent', {
        method: 'POST',
        body: JSON.stringify({ productIds }),
      });
      const paymentIntentData = await paymentIntentRes.json();
      setClientSecret(paymentIntentData.secret);
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
          ) : null}
        </div>
      </Container>
    </Layout>
  );
};

export default CheckoutPage;
