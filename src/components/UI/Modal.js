import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
import { Fragment } from 'react';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}/>;
};

const OverlayModal = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}></div>
      {props.children}
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose}></Backdrop>, portalElement)}
      {ReactDOM.createPortal(
        <OverlayModal> {props.children}</OverlayModal>,
        portalElement
      )}
    </Fragment>
  );
};
export default Modal;
