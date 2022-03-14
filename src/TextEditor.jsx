import React, { useState, useEffect, useRef, useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

//NEED to sanitise whatever gets stored here (opportunity to have concrete examples on how to do this)
//Also use this to keep track of notes in multiple files for IRP
const TextEditor = () => {
  //useCallback to set wrapper instance, otherwise first render crashes app
  const wrapper = useCallback((wrapper) => {
    console.log(wrapper);
    if (wrapper === null) return;
    wrapper.innerHTML = "";
    let editorDiv = document.createElement("div");
    wrapper.append(editorDiv);
    new Quill(editorDiv, { theme: "snow" });
  }, []);

  return <div className="container" ref={wrapper}></div>;
};

export default TextEditor;
