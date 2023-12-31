import React, { createContext } from 'react';
import { useLocalState } from '../hooks/useLocalState';

const defaultState = new Map();

export const CartContext = createContext(defaultState);

export const CartProvider = ({ children }) => {
  const [state, setState] = useLocalState('cart', defaultState);

  const add = (item) => {
    const newState = new Map([...state]);
    newState.set(item.id, item);
    setState(newState);
  };

  const get = (id) => {
    return state.get(id);
  };

  const getAll = () => {
    return [...state.values()];
  };

  const getTotal = () => {
    return getAll().reduce((prev, curr) => prev + curr.frontmatter.price, 0);
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
        getTotal,
        remove,
        removeAll,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
