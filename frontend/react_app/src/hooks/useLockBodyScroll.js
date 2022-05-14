/* eslint-disable no-sequences */
import { useLayoutEffect } from "react";
import { isHandheldDevice, isSafariBrowser } from "../utils";

function useLockBodyScroll() {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(
      document.documentElement
    ).overflow;
    const originalScrollBarDisplay = document.getElementById("modalScrollBar")
      ?.style.display
      ? document.getElementById("modalScrollBar").style.display
      : "none";

    const originalMarginRight = window.getComputedStyle(
      document.documentElement
    ).marginRight;
    const originalBottomNavRight = document?.getElementById("bottomNavDivNav")
      .style.right
      ? document.getElementById("bottomNavDivNav").style.right
      : 0;
    const originalTopNavRight = document.getElementById("topNavDivNav").style
      .right
      ? document.getElementById("topNavDivNav").style.right
      : 0;
    const originalLogoMarginLeft = document.getElementById("topNavLogo").style
      .marginLeft
      ? document.getElementById("topNavLogo").style.marginLeft
      : "5px";

    document.documentElement.style.overflow = "hidden";

    document.documentElement.style.marginRight =
      isHandheldDevice || isSafariBrowser ? originalMarginRight : "17px";

    document.getElementById("bottomNavDivNav").style.right =
      isHandheldDevice || isSafariBrowser ? originalBottomNavRight : "8.5px";

    document.getElementById("topNavLogo").style.marginLeft =
      isHandheldDevice || isSafariBrowser ? originalLogoMarginLeft : "22px";

    document.getElementById("topNavDivNav").style.right =
      isHandheldDevice || isSafariBrowser ? originalTopNavRight : "17px";

    document.getElementById("modalScrollBar").style.display =
      isHandheldDevice || isSafariBrowser ? originalScrollBarDisplay : "block";

    return () => (
      (document.documentElement.style.overflow = originalStyle),
      (document.documentElement.style.marginRight = originalMarginRight),
      (document.getElementById("bottomNavDivNav").style.right =
        originalBottomNavRight),
      (document.getElementById("topNavDivNav").style.right =
        originalTopNavRight),
      (document.getElementById("modalScrollBar").style.display =
        originalScrollBarDisplay),
      (document.getElementById("topNavLogo").style.marginLeft =
        originalLogoMarginLeft)
    );
  }, []);
}

export default useLockBodyScroll;
