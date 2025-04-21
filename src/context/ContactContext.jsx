import { createContext, useReducer, useContext } from 'react';

const initialState = {
  contacts: [],
  selectedIds: [],
  multiSelectMode: false,
  selectedContact: null,
};

const ContactContext = createContext(initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_CONTACT':
      return { ...state, contacts: [...state.contacts, action.payload] };

    case 'EDIT_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(c =>
          c.id === action.payload.id ? { ...c, ...action.payload.updated } : c
        ),
        selectedContact: null
      };

      case 'DELETE_CONTACT':
        return {
          ...state,
          contacts: state.contacts.filter(c => c.id !== action.payload),
        };
      

    case 'SET_SELECTED_CONTACT':
      return { ...state, selectedContact: action.payload };

    case 'DELETE_SELECTED':
      return {
        ...state,
        contacts: state.contacts.filter(c => !state.selectedIds.includes(c.id)),
        selectedIds: [],
        multiSelectMode: false,
      };

    case 'TOGGLE_MULTI_SELECT':
      return {
        ...state,
        multiSelectMode: !state.multiSelectMode,
        selectedIds: [], 
      };

    case 'SELECT_CONTACT':
      return { ...state, selectedIds: [...state.selectedIds, action.payload] };

    case 'UNSELECT_CONTACT':
      return {
        ...state,
        selectedIds: state.selectedIds.filter(id => id !== action.payload),
      };

    default:
      return state;
  }
}

export const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContacts = () => useContext(ContactContext);
