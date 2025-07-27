import { memo, useEffect, useRef, useState } from 'react';
import StateExplorerModal from './StateExplorerModal';

const StateExplorer = ({ store, reducerName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    const handleKeyDown = e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        modalRef.current &&
        !(modalRef.current as any).contains(event.target)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsModalOpen]);

  // return nothing if user is not on localhost
  if (window.location.hostname !== 'localhost') {
    return null;
  }

  return (
    <div>
      <StateExplorerModal
        reducerName={reducerName}
        store={store}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default memo(StateExplorer);
