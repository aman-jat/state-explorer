// src/StateExplorer.jsx
import { memo, useEffect, useRef, useState } from "react";
import ReactJson from "react-json-view";
var StateExplorer = ({ store, reducerName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClose = useCallback(() => setIsModalOpen(false), []);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  const state = reducerName ? store.getState()[reducerName] : store.getState();
  const [searchKey, setSearchKey] = useState("");
  const [debouncedSearchKey, setDebouncedSearchKey] = useState(searchKey);
  const [filteredState, setFilteredState] = useState(state);
  const modalRef2 = useRef(null);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchKey(searchKey);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchKey]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef2.current && !modalRef2.current.contains(event.target)) {
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
      setFilteredState(
        isEmpty ? { error: `Path "${debouncedSearchKey}" not found` } : filtered
      );
    }
  }, [debouncedSearchKey, state]);
  if (!isModalOpen) return null;
  if (window.location.hostname !== "localhost") {
    return null;
  }
  return /* @__PURE__ */ React.createElement("div", { className: "state-explorer-backdrop" }, /* @__PURE__ */ React.createElement("div", { ref: modalRef2, className: "state-explorer-container" }, /* @__PURE__ */ React.createElement("div", { className: "state-explorer-header" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "state-explorer-title" }, "State Explorer"), /* @__PURE__ */ React.createElement("p", { className: "state-explorer-subtitle" }, "Powered by AJ3")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onClose,
      className: "state-explorer-close",
      "aria-label": "Close"
    },
    "\xD7"
  )), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Search path (e.g., user.name)",
      className: "state-explorer-search",
      value: searchKey,
      onChange: (e) => setSearchKey(e.target.value),
      autoFocus: true
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "state-explorer-json" }, /* @__PURE__ */ React.createElement(ReactJson, { src: filteredState, collapsed: 2 }))));
};
var StateExplorer_default = memo(StateExplorer);

// index.js
var index_default = StateExplorer_default;
export {
  index_default as default
};
