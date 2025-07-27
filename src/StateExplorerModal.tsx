import { useEffect, useState, useRef, memo } from 'react';
import ReactJson from 'react-json-view';
import './index.css';

const StateExplorerModal = ({
  isOpen,
  onClose,
  store,
  reducerName,
}: {
  isOpen: boolean;
  onClose: () => void;
  store: any;
  mergeAllReducers?: boolean;
  reducerName?: string;
}) => {
  const state = reducerName ? store.getState()[reducerName] : store.getState();

  const [searchKey, setSearchKey] = useState('');
  const [debouncedSearchKey, setDebouncedSearchKey] = useState(searchKey);
  const [filteredState, setFilteredState] = useState(state);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchKey(searchKey);
    }, 300); // debounce delay in ms

    return () => clearTimeout(handler);
  }, [searchKey]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const filterByPath = (obj: any, search: string) => {
    const result: any = {};

    const recursiveFilter = (
      currentObj: any,
      currentPath = '',
      resultRef = result
    ) => {
      for (let key in currentObj) {
        const fullPath = currentPath ? `${currentPath}.${key}` : key;

        if (fullPath.toLowerCase().startsWith(search.toLowerCase())) {
          resultRef[key] = currentObj[key];
        } else if (search.toLowerCase().startsWith(fullPath.toLowerCase())) {
          if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
            resultRef[key] = {};
            recursiveFilter(currentObj[key], fullPath, resultRef[key]);
          }
        }
      }
    };

    recursiveFilter(obj);
    return result;
  };

  useEffect(() => {
    if (debouncedSearchKey.trim() === '') {
      setFilteredState(state);
    } else {
      const filtered = filterByPath(state, debouncedSearchKey.trim());
      const isEmpty = Object.keys(filtered).length === 0;
      setFilteredState(
        isEmpty ? { error: `Path "${debouncedSearchKey}" not found` } : filtered
      );
    }
  }, [debouncedSearchKey, state]);

  if (!isOpen) return null;

  return (
    <div className='state-explorer-backdrop'>
      <div ref={modalRef} className='state-explorer-container'>
        <div className='state-explorer-header'>
          <div>
            <h2 className='state-explorer-title'>State Explorer</h2>
            <p className='state-explorer-subtitle'>Powered by AJ3</p>
          </div>
          <button
            onClick={onClose}
            className='state-explorer-close'
            aria-label='Close'>
            ×
          </button>
        </div>
        <input
          type='text'
          placeholder='Search path (e.g., user.name)'
          className='state-explorer-search'
          value={searchKey}
          onChange={e => setSearchKey(e.target.value)}
          autoFocus
        />
        <div className='state-explorer-json'>
          <ReactJson src={filteredState} collapsed={2} />
        </div>
      </div>
    </div>
  );
};

export default memo(StateExplorerModal);
