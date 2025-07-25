// components/StateExplorerModal.jsx
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import ReactJson from 'react-json-view';

const StateExplorerModal = ({ isOpen, onClose }) => {
  const globalState: any = useSelector(state => state);
  const [searchKey, setSearchKey] = useState('');
  const [filteredState, setFilteredState] = useState(globalState);
  const modalRef: any = useRef<HTMLDivElement>();

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        modalRef.current &&
        !(modalRef.current as any).contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // 🔍 Recursive partial-path search logic
  const filterByPath = (obj, search) => {
    const result = {};

    const recursiveFilter = (
      currentObj,
      currentPath = '',
      resultRef = result
    ) => {
      for (let key in currentObj) {
        const fullPath = currentPath ? `${currentPath}.${key}` : key;

        if (fullPath.toLowerCase().startsWith(search.toLowerCase())) {
          resultRef[key] = currentObj[key];
        } else if (search.toLowerCase().startsWith(fullPath.toLowerCase())) {
          // Keep this path open for deeper keys
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
    if (searchKey.trim() === '') {
      setFilteredState(globalState);
    } else {
      const filtered = filterByPath(globalState, searchKey.trim());
      const isEmpty = Object.keys(filtered).length === 0;
      setFilteredState(
        isEmpty ? { error: `Path "${searchKey}" not found` } : filtered
      );
    }
  }, [searchKey, globalState]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50'>
      <div
        ref={modalRef}
        className='bg-white/90 backdrop-blur-md p-6 rounded-lg w-[90%] max-w-3xl shadow-xl h-[80vh] overflow-hidden flex flex-col'>
        <div className='flex justify-between items-center mb-4'>
          <div>
            <h2 className='text-xl font-bold'>State Explorer</h2>
            <p style={{ fontSize: '70%', color: '#00000050' }}>Powered by AJ</p>
          </div>
          <button
            onClick={onClose}
            className='cursor-pointer text-red-600 hover:text-white font-bold rounded-full hover:bg-red-600 transition-all duration-300 w-8 h-8 flex items-center justify-center'
            aria-label='Close'>
            ×
          </button>
        </div>
        <input
          type='text'
          placeholder='Search path (e.g., user.name)'
          className='w-full border p-2 mb-4 rounded'
          value={searchKey}
          onChange={e => setSearchKey(e.target.value)}
          autoFocus
        />
        <div className='max-h-[60vh] overflow-auto rounded border p-2'>
          <ReactJson src={filteredState} collapsed={2} />
        </div>
      </div>
    </div>
  );
};

export default StateExplorerModal;
