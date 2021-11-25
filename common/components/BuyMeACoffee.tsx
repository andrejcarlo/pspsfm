import React, { useEffect } from "react";
import Script from 'next/script';

export const BuyMeACoffee : React.FC = () => {
  // const
  useEffect(() => {
    const bmcButton : HTMLElement | null = document.getElementById("bmc-wbtn");
    
    if (bmcButton !== null) {
      bmcButton.style.display = "flex";
    }

    return () => {
      // hide BuymeaCoffe if loaded in the next nav page
      const bmcButtonLoaded = document.getElementById("bmc-wbtn");
      if (bmcButtonLoaded !== null) {
        bmcButtonLoaded.style.display = "none";
      }
    }
  }, []);

  const loadbmc = () => {
    var evt = document.createEvent("Event");
    evt.initEvent("DOMContentLoaded", false, false);
    window.dispatchEvent(evt);
  }

  // eslint-disable-next-line jsx-a11y/iframe-has-title
  return (
    <div id="supportByBMC">
      <Script
        id="supportByBMCScript"
        data-name="BMC-Widget"
        data-cfasync="false"
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        data-id="pspsfm"
        data-description="Support me on Buy me a coffee!"
        data-message="Purrrrrrrrrrr!"
        data-color="#FFFFFF"
        data-position="Right"
        data-x_margin="18"
        data-y_margin="18"
        onLoad={loadbmc}
      />
    </div>
  );
}