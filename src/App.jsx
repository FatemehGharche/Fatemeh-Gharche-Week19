import { useState, useEffect } from 'react';
import { ContactProvider, useContacts } from './context/ContactContext';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar';
import Modal from './components/Modal';


const AppContent = () => {
  const [query, setQuery] = useState('');
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { state, dispatch } = useContacts();

  useEffect(() => {
    if (state.selectedContact) {
      setShowForm(true);  
    }
  }, [state.selectedContact]);

  const deleteSelected = () => {
    dispatch({ type: 'DELETE_SELECTED' });
    setShowDeleteAllModal(false);
  };

  const toggleMultiSelect = () => {
    dispatch({ type: 'TOGGLE_MULTI_SELECT' });
  };

  const handleFormClose = () => {
    setShowForm(false);
    dispatch({ type: 'SET_SELECTED_CONTACT', payload: null }); 
  };

  const handleSubmitData = (contact) => {
    if (state.selectedContact) {
      dispatch({ type: 'EDIT_CONTACT', payload: { id: contact.id, updated: contact } });
    } else {
      dispatch({ type: 'ADD_CONTACT', payload: contact });
    }
  };
  

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <SearchBar
        query={query}
        setQuery={setQuery}
        onAdd={() => setShowForm(true)}
        onToggleMultiSelect={toggleMultiSelect}
        multiSelectMode={state.multiSelectMode}
      />

      {showForm && (
        <ContactForm
        initialValues={state.selectedContact || {}}
        editing={!!state.selectedContact}
        onSubmitData={handleSubmitData}
        onClose={handleFormClose}
      />
      
      )}

      <ContactList query={query} />

      {state.selectedIds.length > 0 && (
        <>
          <button
            style={{ backgroundColor: '#dc3545', color: '#fff', padding: '8px 12px', marginTop: '10px' }}
            onClick={() => setShowDeleteAllModal(true)}
          >
            Delete Selected
          </button>

          {showDeleteAllModal && (
            <Modal
              message="Are you sure you want to delete the selected contacts?"
              onConfirm={deleteSelected}
              onCancel={() => setShowDeleteAllModal(false)}
            />
          )}
        </>
      )}
    </div>
  );
};


const App = () => (
  <ContactProvider>
    <AppContent />
  </ContactProvider>
);

export default App;
