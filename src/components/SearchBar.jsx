import styles from './SearchBar.module.css';
import { Plus, CheckSquare, ArrowLeft } from 'lucide-react'

const SearchBar = ({ query, setQuery, onAdd, onToggleMultiSelect, multiSelectMode }) => (
  <div className={styles.container}>
    <p>Search for Contact:</p>
    <input
      type="text"
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="Search..."
      className={styles.input}
    />
     <button className={styles.iconButton} onClick={onToggleMultiSelect} title={multiSelectMode ? "Cancel Multi-Select" : "Multi-Select"}>
        {multiSelectMode ? <ArrowLeft size={20} /> : <CheckSquare size={20} />}
      </button>
     <button className={styles.iconButton} onClick={onAdd} title="Add Contact">
      <Plus size={20} />
    </button>
  </div>
);

export default SearchBar;

