var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.js
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/StateExplorer.jsx
var import_react = require("react");
var import_react_json_view = __toESM(require("react-json-view"), 1);
var StateExplorer = ({ store, reducerName }) => {
  const [isModalOpen, setIsModalOpen] = (0, import_react.useState)(false);
  const onClose = useCallback(() => setIsModalOpen(false), []);
  (0, import_react.useEffect)(() => {
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
  const [searchKey, setSearchKey] = (0, import_react.useState)("");
  const [debouncedSearchKey, setDebouncedSearchKey] = (0, import_react.useState)(searchKey);
  const [filteredState, setFilteredState] = (0, import_react.useState)(state);
  const modalRef2 = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchKey(searchKey);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchKey]);
  (0, import_react.useEffect)(() => {
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
  (0, import_react.useEffect)(() => {
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
  ), /* @__PURE__ */ React.createElement("div", { className: "state-explorer-json" }, /* @__PURE__ */ React.createElement(import_react_json_view.default, { src: filteredState, collapsed: 2 }))));
};
var StateExplorer_default = (0, import_react.memo)(StateExplorer);

// index.js
var index_default = StateExplorer_default;
