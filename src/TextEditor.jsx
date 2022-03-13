import React, { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

//NEED to sanitise whatever gets stored here (opportunity to have concrete examples on how to do this)
//Also use this to keep track of notes in multiple files for IRP
const TextEditor = () => {
  const testRef = useRef(0);

  useEffect(() => {
    new Quill(
      "#container",
      { theme: "snow" },
      //efergge
      []
    );
  });

  return (
    <div>
      {" "}
      <div id="container"> </div>
    </div>
  );
};

export default TextEditor;
