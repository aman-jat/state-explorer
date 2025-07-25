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

// src/Logic.jsx
var Logic_exports = {};
__export(Logic_exports, {
  default: () => Logic_default
});
module.exports = __toCommonJS(Logic_exports);
var import_react2 = require("react");

// src/StateExplorer.jsx
var import_react = require("react");
var import_react_redux = require("react-redux");
var import_react_json_view = __toESM(require("react-json-view"));
var StateExplorerModal = ({ isOpen, onClose }) => {
  const globalState = (0, import_react_redux.useSelector)((state) => state);
  const [searchKey, setSearchKey] = (0, import_react.useState)("");
  const [filteredState, setFilteredState] = (0, import_react.useState)(globalState);
  const modalRef = (0, import_react.useRef)();
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
    if (searchKey.trim() === "") {
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
  return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      ref: modalRef,
      className: "bg-white/90 backdrop-blur-md p-6 rounded-lg w-[90%] max-w-3xl shadow-xl h-[80vh] overflow-hidden flex flex-col"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-4" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-bold" }, "State Explorer"), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: onClose,
        className: "cursor-pointer text-red-600 hover:text-white font-bold rounded-full hover:bg-red-600 transition-all duration-300 w-8 h-8 flex items-center justify-center",
        "aria-label": "Close"
      },
      "\xD7"
    )),
    /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "text",
        placeholder: "Search path (e.g., user.name)",
        className: "w-full border p-2 mb-4 rounded",
        value: searchKey,
        onChange: (e) => setSearchKey(e.target.value),
        autoFocus: true
      }
    ),
    /* @__PURE__ */ React.createElement("div", { className: "max-h-[60vh] overflow-auto rounded border p-2" }, /* @__PURE__ */ React.createElement(import_react_json_view.default, { src: filteredState, collapsed: 2 }))
  ));
};
var StateExplorer_default = StateExplorerModal;

// src/Logic.jsx
var Logic = () => {
  const [isModalOpen, setIsModalOpen] = (0, import_react2.useState)(false);
  const modalRef = (0, import_react2.useRef)();
  (0, import_react2.useEffect)(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "m") {
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
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "p-6 text-xl" }, "Press Ctrl + M to view Redux State"), /* @__PURE__ */ React.createElement(
    StateExplorer_default,
    {
      isOpen: isModalOpen,
      onClose: () => setIsModalOpen(false)
    }
  ));
};
var Logic_default = Logic;
