import React from "react";
import "./PageRenderContainer.css";

const PageRenderContainer = ({ pageRenderContainerStyle, children }) => {
  return (
    <>
      <span id='pageRenderContainer' style={pageRenderContainerStyle}>
        {children}
      </span>
    </>
  );
};

export default PageRenderContainer;
