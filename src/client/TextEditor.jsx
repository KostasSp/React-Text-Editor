import React, { useState, useEffect, useRef, useCallback } from "react";
import Quill from "quill";
import { io } from "socket.io-client";
import "quill/dist/quill.snow.css";

//NEED to sanitise whatever gets stored here (opportunity to have concrete examples on how to do this)
//Also use this to keep track of notes in multiple files for IRP
const TextEditor = () => {
  useEffect(() => {
    const socket = io("http://localhost:3001");

    return () => socket.disconnect;
  }, []);

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ];

  //useCallback to set wrapper instance (and if for some reason it is still evaluated before it is
  //instanciated, then simply return), otherwise first render crashes app
  const wrapper = useCallback((wrapper) => {
    if (wrapper === null) return;
    wrapper.innerHTML = "";
    let editorDiv = document.createElement("div");
    wrapper.append(editorDiv);
    new Quill(editorDiv, {
      theme: "snow",
      modules: { toolbar: toolbarOptions },
    });
  }, []);

  return <div className="container" ref={wrapper}></div>;
};

export default TextEditor;
