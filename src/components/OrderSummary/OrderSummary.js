import React, { useContext } from 'react';
import { Link, navigate } from 'gatsby';

import Button from '../Button';
import CurrencyFormatter from '../CurrencyFormatter';

import * as styles from './OrderSummary.module.css';
import CartContext from '../../context/CartProvider';

const OrderSummary = (props) => {
  const { getTotal } = useContext(CartContext);
  const total = typeof getTotal === 'function' ? getTotal() : 0;
  return (
    <div className={styles.root}>
      <div className={styles.orderSummary}>
        <span className={styles.title}>order summary</span>
        <div className={styles.calculationContainer}>
          <div className={styles.labelContainer}>
            <span>Subtotal</span>
            <span>
              <CurrencyFormatter amount={total} appendZero />
            </span>
          </div>
          <div className={styles.labelContainer}>
            <span>Tax</span>
            <span>
              <CurrencyFormatter amount={0} appendZero />
            </span>
          </div>
        </div>

        <div className={styles.totalContainer}>
          <span>Total: </span>
          <span>
            <CurrencyFormatter amount={total} appendZero />
          </span>
        </div>
      </div>
      <div className={styles.actionContainer}>
        <Button
          onClick={() => navigate('/checkout')}
          fullWidth
          level={'primary'}
        >
          checkout
        </Button>
        <div className={styles.linkContainer}>
          <Link to={'/beats`'}>CONTINUE SHOPPING</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
