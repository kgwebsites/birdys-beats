import { Link } from 'gatsby';
import React, { useContext } from 'react';

import Brand from '../components/Brand';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Icon from '../components/Icons/Icon';
import OrderSummary from '../components/OrderSummary';

import * as styles from './cart.module.css';
import CartContext from '../context/CartProvider';
import Beat from '../components/Beat/Beat';

const CartPage = (props) => {
  const { getAll } = useContext(CartContext);
  const beatsInCart = typeof getAll === 'function' ? getAll() : [];

  return (
    <div>
      <div className={styles.contentContainer}>
        <Container size={'large'} spacing={'min'}>
          <div className={styles.headerContainer}>
            <div className={styles.shoppingContainer}>
              <Link className={styles.shopLink} to={'/shop'}>
                <Icon symbol={'arrow'}></Icon>
                <span className={styles.continueShopping}>
                  Continue Shopping
                </span>
              </Link>
            </div>
            <Brand />
          </div>
          <div className={styles.summaryContainer}>
            <h3>Cart</h3>
            <div className={styles.cartContainer}>
              <div className={styles.cartItemsContainer}>
                {beatsInCart.map((beat) => (
                  <Beat key={beat.id} beat={beat} />
                ))}
              </div>
              <OrderSummary />
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
