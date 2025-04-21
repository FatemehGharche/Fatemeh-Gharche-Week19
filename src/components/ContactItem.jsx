import { useState } from 'react';
import styles from './ContactItem.module.css';
import Modal from './Modal';

const ContactItem = ({ contact, onEdit, onDelete, multiSelectMode, onSelect, onUnselect, isSelected }) => {
  const [showActions, setShowActions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleToggleActions = () => {
    setShowActions(true); 
  };

  const handleDelete = () => {
    setShowDeleteModal(true); 
  };

  const confirmDelete = () => {
    onDelete(contact.id); 
    setShowDeleteModal(false); 
    setShowActions(false); 
  };

  const cancelDelete = () => {
    setShowDeleteModal(false); 
  };

  const handleEdit = () => {
    onEdit(contact); 
    setShowActions(false); 
  };

  const handleCheckboxChange = () => {
    if (isSelected) {
      onUnselect(contact.id);
    } else {
      onSelect(contact.id);
    }
  };

  return (
    <div className={styles.item}>
      <div className={styles.info}>
        <p>{contact.name} {contact.lastname}</p>
        <p>{contact.email}</p>
      </div>

      <div className={styles.actions}>
        {multiSelectMode ? (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
            className={styles.checkbox}
          />
        ) : (
          !showActions && <button onClick={handleToggleActions}>...</button> 
        )}

        {showActions && !multiSelectMode && (
          <div className={styles.actionButtons}>
            <button className={styles.edit} onClick={handleEdit}>
              Edit
            </button>
            <button className={styles.delete} onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <Modal
          message="Are you sure you want to delete this contact?"
          onConfirm={confirmDelete}  
          onCancel={cancelDelete}   
        />
      )}
    </div>
  );
};

export default ContactItem;
