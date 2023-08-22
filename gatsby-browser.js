import React from 'react';

import { NotificationProvider } from './src/context/AddItemNotificationProvider';
import { CartProvider } from './src/context/CartProvider';

export const wrapRootElement = ({ element }) => (
  <CartProvider>
    <NotificationProvider>{element}</NotificationProvider>
  </CartProvider>
);
