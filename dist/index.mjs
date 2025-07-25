// src/Logic.tsx
import { useEffect as useEffect2, useRef as useRef2, useState as useState2 } from "react";

// src/StateExplorer.tsx
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import ReactJson from "react-json-view";
import { jsx, jsxs } from "react/jsx-runtime";
var StateExplorerModal = ({ isOpen, onClose }) => {
  const globalState = useSelector((state) => state);
  const [searchKey, setSearchKey] = useState("");
  const [filteredState, setFilteredState] = useState(globalState);
  const modalRef = useRef();
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
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs(
    "div",
    {
      ref: modalRef,
      className: "bg-white/90 backdrop-blur-md p-6 rounded-lg w-[90%] max-w-3xl shadow-xl h-[80vh] overflow-hidden flex flex-col",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "State Explorer" }),
            /* @__PURE__ */ jsx("p", { style: { fontSize: "70%", color: "#00000050" }, children: "Powered by AJ" })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onClose,
              className: "cursor-pointer text-red-600 hover:text-white font-bold rounded-full hover:bg-red-600 transition-all duration-300 w-8 h-8 flex items-center justify-center",
              "aria-label": "Close",
              children: "\xD7"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
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
        /* @__PURE__ */ jsx("div", { className: "max-h-[60vh] overflow-auto rounded border p-2", children: /* @__PURE__ */ jsx(ReactJson, { src: filteredState, collapsed: 2 }) })
      ]
    }
  ) });
};
var StateExplorer_default = StateExplorerModal;

// src/Logic.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var Logic = () => {
  const [isModalOpen, setIsModalOpen] = useState2(false);
  const modalRef = useRef2();
  useEffect2(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "m") {
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
  return /* @__PURE__ */ jsx2("div", { children: /* @__PURE__ */ jsx2(
    StateExplorer_default,
    {
      isOpen: isModalOpen,
      onClose: () => setIsModalOpen(false)
    }
  ) });
};
var Logic_default = Logic;

// index.ts
var index_default = Logic_default;
export {
  index_default as default
};
