import styles from './Modal.module.css';

const Modal = ({
  title = "Confirm Action",
  message,
  children,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No"
}) => (
  <div className={styles.overlay}>
    <div className={styles.modal}>
      {title && <h3 className={styles.title}>{title}</h3>}

      {message && <p className={styles.message}>{message}</p>}

      {children}

      <div className={styles.actions}>
        <button onClick={onConfirm} className={styles.confirm}>{confirmText}</button>
        <button onClick={onCancel} className={styles.cancel}>{cancelText}</button>
      </div>
    </div>
  </div>
);

export default Modal;
