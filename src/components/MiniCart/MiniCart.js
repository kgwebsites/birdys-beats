import { Link, navigate } from 'gatsby';
import React, { useContext } from 'react';

import Button from '../Button';
import CurrencyFormatter from '../CurrencyFormatter';
import MiniCartItem from '../MiniCartItem';

import * as styles from './MiniCart.module.css';
import CartContext from '../../context/CartProvider';

const MiniCart = (props) => {
  const cartContext = useContext(CartContext);
  const cartItems = [...cartContext.state.values()];

  return (
    <div className={styles.root}>
      <div className={styles.titleContainer}>
        <h4>Future 🔥</h4>
      </div>
      <div className={styles.cartItemsContainer}>
        {cartItems.map((cartItem) => (
          <MiniCartItem
            key={cartItem.id}
            id={cartItem.id}
            image={cartItem.frontmatter.image}
            name={cartItem.frontmatter.title}
            price={220}
            description={cartItem.frontmatter.description}
          />
        ))}
      </div>
      <div className={styles.summaryContainer}>
        <div className={styles.summaryContent}>
          <div className={styles.totalContainer}>
            <span>Total (USD)</span>
            <span>
              <CurrencyFormatter amount={220} appendZero />
            </span>
          </div>
          <span className={styles.taxNotes}>
            Taxes and shipping will be calculated at checkout
          </span>
          <Button onClick={() => navigate('/cart')} level={'primary'} fullWidth>
            checkout
          </Button>
          <div className={styles.linkContainer}>
            <Link to={'/shop'}>continue shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCart;
