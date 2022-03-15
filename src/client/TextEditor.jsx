import React, { useState, useEffect, useRef, useCallback } from "react";
import Quill from "quill";
import { io } from "socket.io-client";
import "quill/dist/quill.snow.css";
import toolbarOptions from "./ToolbarOptions";

//NEED to sanitise whatever gets stored here (opportunity to have concrete examples on how to do this)
//Also use this to keep track of notes in multiple files for IRP
const TextEditor = () => {
  console.log(toolbarOptions);
  useEffect(() => {
    const socket = io("http://localhost:3001");

    return () => socket.disconnect;
  }, []);

  //useCallback (instead of useEffect) to set wrapper instance (and if for some reason it is still
  //evaluated before it is instantiated, then simply return), bcs otherwise first render crashes app
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
