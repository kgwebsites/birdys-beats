import React, { createContext, useState } from 'react';
import { useLocalState } from '../hooks/useLocalState';

const defaultState = new Map();

export const CartContext = createContext(defaultState);

export const CartProvider = ({ children }) => {
  const [state, setState] = useLocalState('cart', defaultState);

  const add = (item) => {
    const newState = new Map([...state]);
    const itemInCart = state.get(item.id);
    if (itemInCart) {
      newState.set(item.id, {
        ...itemInCart,
        quanity: itemInCart.quantity + 1,
      });
    } else {
      newState.set(item.id, item);
    }
    setState(newState);
  };

  const get = (id) => {
    return state.get(id);
  };

  const getAll = () => {
    return [...state.values()];
  };

  const remove = (id) => {
    const newState = new Map([...state]);
    newState.delete(id);
    setState(newState);
  };

  const removeAll = () => {
    setState(new Map());
  };
  return (
    <CartContext.Provider
      value={{
        state,
        add,
        get,
        getAll,
        remove,
        removeAll,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
