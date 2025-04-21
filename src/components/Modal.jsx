import styles from './Modal.module.css';

const Modal = ({ message, onConfirm, onCancel }) => (
  <div className={styles.overlay}>
    <div className={styles.modal}>
      <p>{message}</p>
      <button onClick={onConfirm} className={styles.confirm}>Yes</button>
      <button onClick={onCancel} className={styles.cancel}>No</button>
    </div>
  </div>
);

export default Modal;
