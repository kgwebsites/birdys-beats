import React, { useContext } from 'react';

import Icon from '../Icons/Icon';

import * as styles from './RemoveItem.module.css';
import CartContext from '../../context/CartProvider';

const RemoveItem = ({ id }) => {
  const cartContext = useContext(CartContext);

  return (
    <button className={styles.root} onClick={() => cartContext.remove(id)}>
      <Icon symbol={'cross'} />
    </button>
  );
};

export default RemoveItem;
