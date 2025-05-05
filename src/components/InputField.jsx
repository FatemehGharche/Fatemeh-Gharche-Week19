import styles from './InputField.module.css'; 

const InputField = ({ label, name, type = "text", register, error, ...rest }) => {
  return (
    <div className={styles.inputField}>
      <label htmlFor={name} className={styles.label}>{label}</label>
      <input
        id={name}
        type={type}
        {...register(name)}
        className={styles.input}
        {...rest}
      />
      {error && <p className={styles.error}>{error.message}</p>}
    </div>
  );
};

export default InputField;
