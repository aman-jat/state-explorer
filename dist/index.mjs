// src/StateExplorer.tsx
import { memo as memo2, useEffect as useEffect2, useRef as useRef2, useState as useState2 } from "react";

// src/StateExplorerModal.tsx
import { useEffect, useState, useRef, memo } from "react";
import ReactJson from "react-json-view";
import { jsx, jsxs } from "react/jsx-runtime";
var StateExplorerModal = ({ isOpen, onClose, store, reducerName }) => {
  const state = reducerName ? store.getState()[reducerName] : store.getState();
  const [searchKey, setSearchKey] = useState("");
  const [debouncedSearchKey, setDebouncedSearchKey] = useState(searchKey);
  const [filteredState, setFilteredState] = useState(state);
  const modalRef = useRef(null);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchKey(searchKey);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchKey]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);
  const filterByPath = (obj, search) => {
    const result = {};
    const recursiveFilter = (currentObj, currentPath = "", resultRef = result) => {
      for (let key in currentObj) {
        const fullPath = currentPath ? `${currentPath}.${key}` : key;
        if (fullPath.toLowerCase().startsWith(search.toLowerCase())) {
          resultRef[key] = currentObj[key];
        } else if (search.toLowerCase().startsWith(fullPath.toLowerCase())) {
          if (typeof currentObj[key] === "object" && currentObj[key] !== null) {
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
    if (debouncedSearchKey.trim() === "") {
      setFilteredState(state);
    } else {
      const filtered = filterByPath(state, debouncedSearchKey.trim());
      const isEmpty = Object.keys(filtered).length === 0;
      setFilteredState(isEmpty ? { error: `Path "${debouncedSearchKey}" not found` } : filtered);
    }
  }, [debouncedSearchKey, state]);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx("div", { className: "state-explorer-backdrop", children: /* @__PURE__ */ jsxs("div", { ref: modalRef, className: "state-explorer-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "state-explorer-header", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "state-explorer-title", children: "State Explorer" }),
        /* @__PURE__ */ jsx("p", { className: "state-explorer-subtitle", children: "Powered by AJ" })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, className: "state-explorer-close", "aria-label": "Close", children: "\xD7" })
    ] }),
    /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Search path (e.g., user.name)", className: "state-explorer-search", value: searchKey, onChange: (e) => setSearchKey(e.target.value), autoFocus: true }),
    /* @__PURE__ */ jsx("div", { className: "state-explorer-json", children: /* @__PURE__ */ jsx(ReactJson, { src: filteredState, collapsed: 2 }) })
  ] }) });
};
var StateExplorerModal_default = memo(StateExplorerModal);

// src/StateExplorer.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var StateExplorer = ({ store, reducerName }) => {
  const [isModalOpen, setIsModalOpen] = useState2(false);
  const modalRef = useRef2();
  useEffect2(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  useEffect2(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsModalOpen]);
  if (window.location.hostname !== "localhost") {
    return null;
  }
  return /* @__PURE__ */ jsx2(
    StateExplorerModal_default,
    {
      reducerName,
      store,
      isOpen: isModalOpen,
      onClose: () => setIsModalOpen(false)
    }
  );
};
var StateExplorer_default = memo2(StateExplorer);

// index.ts
var index_default = StateExplorer_default;
export {
  index_default as default
};
//# sourceMappingURL=index.mjs.map