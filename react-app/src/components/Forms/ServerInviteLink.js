import { useEffect, useState } from "react";
import "./NonAuthFormsCSS/ServerInviteLink.css";

function ServerInviteLink({ setShowInvite }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }, [copied]);

  function copyLink() {
    const url = document.getElementById("server__invite__link");
    url.select();
    url.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(url.value);
    setCopied(true);
    console.log(url.value);
  }
  console.log(copied);

  //
  const server_uuid = window.location.pathname.split("/")[2];
  return (
    <div className="server__invite__url__container">
      <div className="copy__server__invite__container">
        <div className="server__invite__header">
          <span>Invite a friend!</span>
          <div
            onClick={() => {
              setShowInvite(false);
            }}
            className="create__inbox__x"
          ></div>
        </div>
        <span>Try the Copy button!</span>
        <div className="server__invite__link__input__container">
          <input
            className="server__invite__link__input"
            id="server__invite__link"
            // onChange={(e) => {
            //   setSearchInput(e.target.value);
            // }}
            disabled
            value={server_uuid}
          ></input>
          <div
            className={copied ? "server__invite__copy__button__active" : "server__invite__copy__button"}
            onClick={copyLink}
          >
            {copied ? "Copied" : "Copy"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServerInviteLink;
