import { useState, useEffect } from 'react';
import { useContacts } from '../context/ContactContext';
import Modal from './Modal';
import styles from "./ContactForm.module.css";

const ContactForm = ({ onClose }) => {
  const { state, dispatch } = useContacts();
  const editing = Boolean(state.selectedContact);

  const [form, setForm] = useState({
    name: '',
    lastname: '',
    email: '',
    job: '',
    phone: '',
  });

  const [originalForm, setOriginalForm] = useState(form);
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm(state.selectedContact);
      setOriginalForm(state.selectedContact);
    }
  }, [editing, state.selectedContact]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.lastname.trim()) newErrors.lastname = 'Last name is required.';
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email.';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const hasChanges = () => {
    return Object.keys(form).some(key => form[key] !== (originalForm[key] || ''));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setShowConfirmModal(true);
  };

  const confirmSubmit = () => {
    if (editing) {
      dispatch({
        type: 'EDIT_CONTACT',
        payload: { id: form.id, updated: form },
      });
      dispatch({ type: 'SET_SELECTED_CONTACT', payload: null });
    } else {
      dispatch({
        type: 'ADD_CONTACT',
        payload: { ...form, id: Date.now() },
      });
    }

    setForm({ name: '', lastname: '', email: '', job: '', phone: '' });
    setOriginalForm({ name: '', lastname: '', email: '', job: '', phone: '' });
    setShowConfirmModal(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className={styles.field}
      />
      {errors.name && <span className={styles.error}>{errors.name}</span>}

      <input
        name="lastname"
        value={form.lastname}
        onChange={handleChange}
        placeholder="Last Name"
        className={styles.field}
      />
      {errors.lastname && <span className={styles.error}>{errors.lastname}</span>}

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className={styles.field}
      />
      {errors.email && <span className={styles.error}>{errors.email}</span>}

      <input
        name="job"
        value={form.job}
        onChange={handleChange}
        placeholder="Job"
        className={styles.field}
      />

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
        className={styles.field}
      />
      {errors.phone && <span className={styles.error}>{errors.phone}</span>}

      <button
        type="submit"
        className={styles.action}
        disabled={!hasChanges()}
        style={{ opacity: hasChanges() ? 1 : 0.5, cursor: hasChanges() ? 'pointer' : 'not-allowed' }}
      >
        {editing ? 'Edit' : 'Add'}
      </button>

      {showConfirmModal && (
        <Modal
          message={editing ? "Confirm edit?" : "Confirm add new contact?"}
          onConfirm={confirmSubmit}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}

      {showSuccessMessage && (
        <div className={styles.success}>Successfully {editing ? 'edited' : 'added'} contact!</div>
      )}
    </form>
  );
};

export default ContactForm;
