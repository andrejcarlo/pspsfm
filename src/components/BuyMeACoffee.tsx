import React, { useEffect } from "react";

export const BuyMeACoffee : React.FC = () => {
  // const
  useEffect(() => {
    const script = document.createElement("script");
    const div = document.getElementById("supportByBMC");
    script.setAttribute(
      "src",
      "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
    );
    script.setAttribute("data-name", "BMC-Widget");
    script.setAttribute("data-cfasync", "false");
    script.setAttribute("data-id", "pspsfm");
    script.setAttribute("data-description", "Support me on Buy me a coffee!");
    script.setAttribute(
      "data-message",
      "Purrrrrrrrrrr!"
    );
    script.setAttribute("data-color", "#FF5F5F");
    script.setAttribute("data-position", "Right");
    script.setAttribute("data-x_margin", "18");
    script.setAttribute("data-y_margin", "18");

    script.onload = function () {
      var evt = document.createEvent("Event");
      evt.initEvent("DOMContentLoaded", false, false);
      window.dispatchEvent(evt);
    };
    if (div !== null) {
        div.appendChild(script);
    }
  }, []);

  // eslint-disable-next-line jsx-a11y/iframe-has-title
  return (<div id="supportByBMC"></div>);
}