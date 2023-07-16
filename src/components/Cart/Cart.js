import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartContext.items.map(
        (item) => {
          return <li id={item.id}>{item.name}</li>;
        }
      )}
    </ul>
  );

  return (
    <Modal onClose={props.onCloseAction}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount:</span>
        <span>{cartContext.totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button
          className={classes['button--alt']}
          onClick={props.onCloseAction}
        >
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
