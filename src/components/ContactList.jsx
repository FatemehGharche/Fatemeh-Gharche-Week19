import { useContacts } from '../context/ContactContext';
import ContactItem from './ContactItem';
import styles from './ContactList.module.css';

const ContactList = ({ query }) => {
  const { state, dispatch } = useContacts();

  const filtered = state.contacts.filter(
    c =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.lastname.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase())
  );

  const handleEdit = contact => {
    dispatch({ type: 'SET_SELECTED_CONTACT', payload: contact });
  };

  const handleDelete = id => {
    dispatch({ type: 'DELETE_CONTACT', payload: id });
  };

  const handleSelect = id => {
    dispatch({ type: 'SELECT_CONTACT', payload: id });
  };

  const handleUnselect = id => {
    dispatch({ type: 'UNSELECT_CONTACT', payload: id });
  };

  return (
    <div className={styles.list}>
      {filtered.length === 0 ? (
        <p className={styles.empty}>No contacts found.</p>
      ) : (
        filtered.map(contact => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onEdit={handleEdit}
            onDelete={handleDelete}
            multiSelectMode={state.multiSelectMode}
            onSelect={handleSelect}
            onUnselect={handleUnselect}
            isSelected={state.selectedIds.includes(contact.id)}
          />
        ))
      )}
    </div>
  );
};

export default ContactList;
