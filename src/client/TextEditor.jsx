import React, { useState, useEffect, useRef, useCallback } from "react";
import Quill from "quill";
import { io } from "socket.io-client";
import "quill/dist/quill.snow.css";
import toolbarOptions from "./ToolbarOptions";

//NEED to sanitise whatever gets stored here (opportunity to have concrete examples on how to do this)
//Also use this to keep track of notes in multiple files for IRP
const TextEditor = () => {
  const [shareSocket, setShareSocket] = useState();
  const [shareQuill, setShareQuill] = useState();

  useEffect(() => {
    const socket = io("http://localhost:3001");
    setShareSocket(socket);

    return () => socket.disconnect;
  }, []);

  //useCallback (instead of useEffect) to set wrapper instance (and if for some reason it is still
  //evaluated before it is instantiated, then simply return), bcs otherwise first render crashes app
  const wrapper = useCallback((wrapper) => {
    console.log(wrapper);
    if (wrapper === null) return;
    wrapper.innerHTML = "";
    let editorDiv = document.createElement("div");
    wrapper.append(editorDiv);
    const quill = new Quill(editorDiv, {
      theme: "snow",
      modules: { toolbar: toolbarOptions },
    });
    setShareQuill(quill);
  }, []);

  useEffect(() => {
    //I could also use double equals 'null' - strict equality 'null' breaks the app
    if (typeof shareSocket === "undefined" || typeof shareQuill === "undefined")
      return;

    const detectChange = (delta, oldDelta, source) => {
      if (source !== "user") return;
      shareSocket.emit("send-change", delta);
    };
    shareQuill.on("text-change", detectChange);

    return () => {
      shareQuill.off("text-change", detectChange);
    };
  }, [shareSocket, shareQuill]);

  return <div className="container" ref={wrapper}></div>;
};

export default TextEditor;
