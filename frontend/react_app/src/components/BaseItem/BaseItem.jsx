import React from "react";

import "./BaseItem.css";

const BaseItem = ({ children, base, detail, isPostItem, loader, yt }) => {
  return (
    <>
      <div
        id='baseItem'
        style={{
          marginTop: isPostItem && !detail && "17.5px",
          height: base ? "70px" : loader ? "123px" : "",
          textAlign: base && "center",
          paddingTop: base && "35px",
          minHeight: yt && "150px",
        }}
      >
        {children}
      </div>
    </>
  );
};
export default BaseItem;
