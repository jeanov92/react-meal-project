import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  let updatedItems;

  if (action.type === 'ADD') {
    const itemIdx = state.items.findIndex((item) => item.id === action.item.id);
    const existingItem = state.items[itemIdx];
    const updateTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    if (existingItem) {
      const newAmount = existingItem.amount + action.item.amount;
      const updatedItem = { ...existingItem, amount: newAmount };
      updatedItems = [...state.items];
      updatedItems[itemIdx] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updateTotalAmount,
    };
  }

  if (action.type === 'REMOVE') {
    const itemIdx = state.items.findIndex((item) => item.id === action.id);
    const existingItem = state.items[itemIdx];
    const updateTotalAmount = state.totalAmount - existingItem.price;
    updatedItems = [...state.items];

    if (existingItem.amount === 1) {
      updatedItems = updatedItems.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems[itemIdx] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updateTotalAmount,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispactchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispactchCartAction({ type: 'ADD', item: item });
  };

  const removerItemFromCartHandler = (id) => {
    dispactchCartAction({ type: 'REMOVE', id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removerItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
