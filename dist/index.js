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

// index.ts
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/StateExplorer.tsx
var import_react2 = require("react");

// src/StateExplorerModal.tsx
var import_react = require("react");
var import_react_json_view = __toESM(require("react-json-view"));
var import_jsx_runtime = require("react/jsx-runtime");
var StateExplorerModal = ({ isOpen, onClose, store, reducerName }) => {
  const state = reducerName ? store.getState()[reducerName] : store.getState();
  const [searchKey, setSearchKey] = (0, import_react.useState)("");
  const [debouncedSearchKey, setDebouncedSearchKey] = (0, import_react.useState)(searchKey);
  const [filteredState, setFilteredState] = (0, import_react.useState)(state);
  const modalRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchKey(searchKey);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchKey]);
  (0, import_react.useEffect)(() => {
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
  (0, import_react.useEffect)(() => {
    if (debouncedSearchKey.trim() === "") {
      setFilteredState(state);
    } else {
      const filtered = filterByPath(state, debouncedSearchKey.trim());
      const isEmpty = Object.keys(filtered).length === 0;
      setFilteredState(isEmpty ? { error: `Path "${debouncedSearchKey}" not found` } : filtered);
    }
  }, [debouncedSearchKey, state]);
  if (!isOpen) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "state-explorer-backdrop", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref: modalRef, className: "state-explorer-container", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "state-explorer-header", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "state-explorer-title", children: "State Explorer" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "state-explorer-subtitle", children: "Powered by AJ" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: onClose, className: "state-explorer-close", "aria-label": "Close", children: "\xD7" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "text", placeholder: "Search path (e.g., user.name)", className: "state-explorer-search", value: searchKey, onChange: (e) => setSearchKey(e.target.value), autoFocus: true }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "state-explorer-json", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_json_view.default, { src: filteredState, collapsed: 2 }) })
  ] }) });
};
var StateExplorerModal_default = (0, import_react.memo)(StateExplorerModal);

// src/StateExplorer.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var StateExplorer = ({ store, reducerName }) => {
  const [isModalOpen, setIsModalOpen] = (0, import_react2.useState)(false);
  const modalRef = (0, import_react2.useRef)();
  (0, import_react2.useEffect)(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  (0, import_react2.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    StateExplorerModal_default,
    {
      reducerName,
      store,
      isOpen: isModalOpen,
      onClose: () => setIsModalOpen(false)
    }
  ) });
};
var StateExplorer_default = (0, import_react2.memo)(StateExplorer);

// index.ts
var index_default = StateExplorer_default;
